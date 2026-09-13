# 403 Error Fix - Troubleshooting Guide

## Problem
Users were getting 403 (Forbidden) errors when trying to login or register, even though these endpoints should be public.

## Root Causes Identified & Fixed

### 1. **Token Not Stored Before Subsequent Requests**
**Issue**: The `login()` and `register()` methods in `userApi.ts` were calling `/user/me` immediately after getting the response, but the token hadn't been saved to `localStorage` yet. The second request (to `/user/me`) failed because it had no token.

**File**: `frontend/src/api/userApi.ts`

**Fix**: Modified the API calls to pass the token in a config object when making the `/user/me` request, instead of relying on the axios interceptor:
```typescript
const configWithToken = {
    headers: {
        Authorization: `Bearer ${response.data.token}`,
        'Content-Type': 'application/json'
    }
};
const userResponse = await axiosInstance.get<User>('/user/me', configWithToken);
```

Added fallback logic - if `/user/me` fails, the login/register still succeeds using data from the login/register response itself.

### 2. **Axios Interceptor Redirect on 401**
**Issue**: The axios response interceptor was redirecting to `/login` on 401 errors, which could interfere with the login flow itself.

**File**: `frontend/src/axios/axios.ts`

**Fix**: Updated the interceptor to:
- Only redirect to `/login` if not already on the login page
- Added console logging for debugging API errors
- Made the error handling more robust

```typescript
if (error.response?.status === 401) {
    localStorage.removeItem('jwt_token');
    // Redirect to login if not already on login page
    if (window.location.pathname !== '/login') {
        window.location.href = '/login';
    }
}
```

### 3. **Error Handling in AuthContext**
**Issue**: Errors during login/register weren't being caught and cleared properly.

**File**: `frontend/src/context/AuthContext.tsx`

**Fix**: Added proper error handling with cleanup:
```typescript
const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
        const response = await userApi.login({ username, password });
        const { token: newToken, user: userData } = response.data;
        
        // Store token FIRST
        localStorage.setItem('jwt_token', newToken);
        setToken(newToken);
        setUser(userData);
    } catch (error) {
        // Clear any partial state on error
        localStorage.removeItem('jwt_token');
        setToken(null);
        setUser(null);
        throw error;
    } finally {
        setIsLoading(false);
    }
};
```

## Testing the Fix

### **Login Test**
1. Navigate to http://localhost:3000/login
2. Enter credentials: `bob_brown` / `password123`
3. Click "Login"
4. Should see: Loading → Success → Redirect to /accommodations with user logged in

### **Registration Test**
1. Navigate to http://localhost:3000/register
2. Fill in new user details:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Username: johndoe
   - Password: password123
   - Confirm: password123
3. Click "Register"
4. Should see: Loading → Success → Redirect to /accommodations with new user logged in

### **Expected Results**
- ✅ No 403 errors
- ✅ Token saved to localStorage
- ✅ Navigation bar shows user name and role
- ✅ User avatar with initials appears
- ✅ Logout button available

## Backend Security Configuration

The backend is correctly configured to allow public access to login/register:

**File**: `src/main/java/mk/ukim/finki/wp/lab2233009/config/JwtWebSecurityConfig.java` (lines 98-101)

```java
.requestMatchers(
    "/swagger-ui/**",
    "/swagger-ui.html",
    "/v3/api-docs/**",
    "/api/user/register",
    "/api/user/login"
)
.permitAll()
```

These endpoints are explicitly allowed without authentication.

## Files Modified for Fix

1. **frontend/src/api/userApi.ts**
   - Updated `login()` method to handle token before /user/me request
   - Updated `register()` method with same token handling
   - Added fallback to response data if /user/me fails

2. **frontend/src/axios/axios.ts**
   - Added console logging for debugging
   - Fixed 401 redirect to not redirect if already on /login page
   - Improved error handling structure

3. **frontend/src/context/AuthContext.tsx**
   - Added proper error cleanup in catch blocks
   - Added localStorage.setItem before state updates
   - Improved error propagation

## Debugging Tips

If you still encounter issues, check the browser console for:

1. **Network tab**: 
   - Look for POST request to `/api/user/login` or `/api/user/register`
   - Check response status (should be 200, not 403)
   - Check Authorization header in requests

2. **Console logs**:
   - Look for "API Error:" messages showing status codes
   - Look for "Failed to fetch user details after login" warnings

3. **Backend logs**:
   - Check Spring Boot server logs for any security exceptions
   - Verify JWT filter is not rejecting valid tokens

## If Issues Persist

1. **Clear localStorage**: Open DevTools Console and run:
   ```javascript
   localStorage.clear();
   location.reload();
   ```

2. **Check Backend**: Ensure the backend is running on http://localhost:8080

3. **Check CORS**: Verify in JwtWebSecurityConfig that your frontend port (3000) is in allowedOrigins

4. **Restart Frontend Dev Server**: Kill port 3000 and restart npm run dev

