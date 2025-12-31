# Flarum Integration Guide

## Flow

1. User on vault clicks "Log in with NDZ"
2. User logs in on Flarum forum (ndz.ng)
3. User clicks "Go to NDZ Vault" link/button on Flarum
4. User lands back on vault
5. Vault checks Flarum session via `/api/flarum-me` endpoint

## Adding "Go to NDZ Vault" Link to Flarum

You can add a "Go to NDZ Vault" link to Flarum in several ways:

### Option 1: Add to Navigation Menu

1. Go to Flarum Admin → Appearance → Navigation
2. Add a new navigation item:
   - **Title**: "NDZ Vault" or "Go to NDZ Vault"
   - **URL**: `https://dev.ndz.ng`
   - **Icon**: (optional)

### Option 2: Add to Header (via extension or custom HTML)

If you have access to Flarum's header, you can add:
```html
<a href="https://dev.ndz.ng" class="Button Button--link">Go to NDZ Vault</a>
```

### Option 3: Add to User Menu

You can add it to the user dropdown menu via a Flarum extension or custom code.

### Option 4: Add to Footer

Add it to the Flarum footer via Admin → Appearance → Footer.

## Cookie Configuration

Make sure Flarum cookies are set with domain `.ndz.ng` so both `ndz.ng` and `vault.ndz.ng` can access them.

In Flarum's `config.php`:
```php
'cookie' => [
    'domain' => '.ndz.ng',
],
```

## Testing

1. Visit dev.ndz.ng/resource/[any-resource]
2. Click "Continue with NDZ Account"
3. Log in on Flarum
4. Click "Go to NDZ Vault" link
5. You should be redirected to vault and see the download button

