# Flarum SSO Extension Troubleshooting

## The Problem
Flarum's SSO extension is causing an infinite redirect loop.

## Solution: Disable SSO Extension (Recommended)

**You might not need the SSO extension at all!** 

The simple flow works like this:
1. User clicks "Continue with NDZ" → goes to `ndz.ng/login`
2. User logs in on Flarum
3. Flarum sets cookies with domain `.ndz.ng`
4. User is redirected back to `dev.ndz.ng`
5. `hooks.server.ts` automatically detects and validates the cookie
6. User is authenticated ✅

**No SSO extension needed!**

## Steps to Fix

### Option 1: Disable SSO Extension (Simplest)
1. Go to Flarum Admin → Extensions
2. Find the SSO extension
3. **Disable it**
4. Make sure Flarum cookies are set with domain `.ndz.ng` in `config.php`:
   ```php
   'cookie' => [
       'domain' => '.ndz.ng',
   ],
   ```

### Option 2: Fix SSO Extension Configuration
If you want to keep the SSO extension, check these settings:

1. **Login URL**: Should be `https://dev.ndz.ng/auth/sso/login`
2. **Signup URL**: Should be `https://dev.ndz.ng/auth/sso/signup`
3. **Logout URL**: Should be `https://dev.ndz.ng/auth/sso/logout`
4. **Issuer Domain**: Should be `https://dev.ndz.ng` (NOT `https://ndz.ng`)
5. **Signing Method**: SHA256
6. **Signer Key**: Your JWT secret

**Important**: The SSO extension might be misconfigured. If it keeps redirecting in a loop, try:
- Clearing Flarum cache
- Checking Flarum error logs
- Temporarily disabling the extension to test

## Testing Without SSO Extension

1. Disable the SSO extension in Flarum
2. Ensure cookies have domain `.ndz.ng`
3. Test the flow:
   - Click "Continue with NDZ" on dev.ndz.ng
   - Login on Flarum
   - Should redirect back and work automatically

If this works, you don't need the SSO extension at all!

