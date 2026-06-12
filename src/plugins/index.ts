import { ecommercePlugin } from '@payloadcms/plugin-ecommerce'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { Plugin } from 'payload'

import { stripeAdapter } from '@payloadcms/plugin-ecommerce/payments/stripe'

import { adminOnlyFieldAccess } from '@/access/adminOnlyFieldAccess'
import { adminOrPublishedStatus } from '@/access/adminOrPublishedStatus'
import { customerOnlyFieldAccess } from '@/access/customerOnlyFieldAccess'
import { isAdmin } from '@/access/isAdmin'
import { isDocumentOwner } from '@/access/isDocumentOwner'
import { ProductsCollection } from '@/collections/Products'
import { Page, Product } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

// Payload v3 Cloud Storage Core Imports
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import type {
  Adapter,
  GeneratedAdapter,
  HandleDelete,
  HandleUpload,
} from '@payloadcms/plugin-cloud-storage/types'
import type { UploadApiResponse } from 'cloudinary'
import { v2 as cloudinary } from 'cloudinary'

// Initialize the native Cloudinary SDK
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
})

// Correctly typed Payload v3 Adapter Factory Function
const cloudinaryAdapter = (): Adapter => {
  return ({ collection }) => {
    const generatedAdapter: GeneratedAdapter = {
      name: 'cloudinary-adapter',

      async handleUpload({ file }: Parameters<HandleUpload>[0]) {
        const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: process.env.CLOUDINARY_FOLDER || 'powersportsplug_media',
              resource_type: 'auto',
              timeout: 60000, // Instructs the SDK to keep the socket alive for up to 60 seconds
            },
            (error, result) => {
              if (error || !result) return reject(error)
              resolve(result)
            },
          )
          uploadStream.end(file.buffer)
        })

        // Map dimensions back into Payload's tracking system
        file.filename = uploadResult.public_id
        file.mimeType = `${uploadResult.resource_type}/${uploadResult.format}`
        file.filesize = uploadResult.bytes
        return file
      },

      async handleDelete({ filename }: Parameters<HandleDelete>[0]) {
        await cloudinary.uploader.destroy(filename)
      },

      staticHandler: async () => new Response(null, { status: 404 }),
    }

    return generatedAdapter
  }
}

const generateTitle: GenerateTitle<Product | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Powersports Plug` : 'Powersports Plug'
}

const generateURL: GenerateURL<Product | Page> = ({ doc }) => {
  const url = getServerSideURL()
  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formSubmissionOverrides: {
      access: {
        delete: isAdmin,
        read: isAdmin,
        update: isAdmin,
      },
      admin: {
        group: 'Content',
      },
    },
    formOverrides: {
      access: {
        delete: isAdmin,
        read: isAdmin,
        update: isAdmin,
        create: isAdmin,
      },
      admin: {
        group: 'Content',
      },
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
  }),
  ecommercePlugin({
    access: {
      adminOnlyFieldAccess,
      adminOrPublishedStatus,
      customerOnlyFieldAccess,
      isAdmin,
      isDocumentOwner,
    },
    customers: {
      slug: 'users',
    },
    orders: {
      ordersCollectionOverride: ({ defaultCollection }) => ({
        ...defaultCollection,
        fields: [
          ...defaultCollection.fields,
          {
            name: 'accessToken',
            type: 'text',
            unique: true,
            index: true,
            admin: {
              position: 'sidebar',
              readOnly: true,
            },
            hooks: {
              beforeValidate: [
                ({ value, operation }) => {
                  if (operation === 'create' || !value) {
                    return crypto.randomUUID()
                  }
                  return value
                },
              ],
            },
          },
        ],
      }),
    },
    payments: {
      paymentMethods: [
        stripeAdapter({
          secretKey: process.env.STRIPE_SECRET_KEY!,
          publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
          webhookSecret: process.env.STRIPE_WEBHOOKS_SIGNING_SECRET!,
        }),
      ],
    },
    products: {
      productsCollectionOverride: ProductsCollection,
    },
  }),

  // Official Payload v3 Cloud Storage Orchestrator
  cloudStoragePlugin({
    collections: {
      media: {
        adapter: cloudinaryAdapter(),
        disableLocalStorage: true,
        disablePayloadAccessControl: true,
        generateFileURL: ({ filename }) => {
          // Resolves image paths directly via Cloudinary's secure global CDN
          return cloudinary.url(filename, { secure: true })
        },
      },
    },
  }),
]
