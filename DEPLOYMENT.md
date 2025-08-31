# Deployment Guide for Vercel

This guide will help you deploy your Next.js application to Vercel successfully.

## Prerequisites

1. **Clerk Account**: Set up authentication at [clerk.com](https://clerk.com)
2. **Convex Account**: Set up database at [convex.dev](https://convex.dev)
3. **Vercel Account**: Deploy at [vercel.com](https://vercel.com)

## Step 1: Set up Clerk Authentication

1. Create a new application in Clerk Dashboard
2. Go to API Keys section
3. Copy your **Publishable Key** and **Secret Key**

## Step 2: Set up Convex Database

1. Create a new project in Convex Dashboard
2. Copy your **Convex URL** (looks like: `https://your-project.convex.cloud`)
3. Set up Clerk integration in Convex:
   - Go to Settings > Auth
   - Add Clerk as a provider
   - Copy the **JWT Issuer Domain** from your Clerk JWT template

## Step 3: Deploy to Vercel

1. **Connect your GitHub repository** to Vercel
2. **Add Environment Variables** in Vercel:
   - Go to your project settings in Vercel
   - Navigate to "Environment Variables"
   - Add the following variables:

### Required Environment Variables

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
CLERK_JWT_ISSUER_DOMAIN=https://your-clerk-domain.clerk.accounts.dev
```

### Environment Variable Details

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key (starts with `pk_test_` or `pk_live_`)
- `CLERK_SECRET_KEY`: Your Clerk secret key (starts with `sk_test_` or `sk_live_`)
- `NEXT_PUBLIC_CONVEX_URL`: Your Convex deployment URL
- `CLERK_JWT_ISSUER_DOMAIN`: Your Clerk JWT issuer domain (from JWT template)

## Step 4: Deploy

1. **Trigger a new deployment** in Vercel
2. **Monitor the build logs** for any errors
3. **Test your application** once deployed

## Troubleshooting

### Common Issues

1. **"Missing publishableKey" Error**
   - Ensure `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is set correctly
   - Check that the key starts with `pk_test_` or `pk_live_`

2. **"NEXT_PUBLIC_CONVEX_URL is not set" Error**
   - Ensure `NEXT_PUBLIC_CONVEX_URL` is set correctly
   - Verify the URL format: `https://your-project.convex.cloud`

3. **TypeScript Errors**
   - The project now includes proper TypeScript configuration
   - All type errors should be resolved

4. **Build Failures**
   - Check that all environment variables are set
   - Ensure your Clerk and Convex services are properly configured

### Local Development

For local development, create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
CLERK_JWT_ISSUER_DOMAIN=https://your-clerk-domain.clerk.accounts.dev
```

## Security Notes

- Never commit your `.env.local` file to version control
- Use different keys for development and production
- Regularly rotate your API keys
- Monitor your application logs for any security issues

## Support

If you encounter any issues:

1. Check the Vercel build logs for specific error messages
2. Verify all environment variables are set correctly
3. Ensure your Clerk and Convex services are active
4. Check the Next.js and Clerk documentation for troubleshooting guides
