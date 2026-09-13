# Quick Start Guide - CRUD Implementation Testing

## Prerequisites

- Node.js and npm installed
- Maven and Java installed
- PostgreSQL database running on port 5433
- Backend built and ready to run

---

## Step 1: Start the Backend

```bash
cd C:\Users\Mario\Desktop\fax\6\ SEMESTAR\2\ EMT\emc-lab-233009

# Start the Spring Boot application
java -jar target/e-shop-backend-0.0.1-SNAPSHOT.jar
```

**Expected Output:**
```
Started Application in X seconds (JVM running for X.XXs)
2026-05-16T... : Tomcat started on port 8080
```

---

## Step 2: Start the Frontend

In a new terminal:

```bash
cd "C:\Users\Mario\Desktop\fax\6 SEMESTAR\2 EMT\emc-lab-233009\frontend"

npm run dev
```

**Expected Output:**
```
VITE v8.0.10  ready in 123 ms

➜  Local:   http://localhost:3000/
➜  press h to show help
```

**Important:** Make sure the port is `3000`. If another port appears, kill the process using port 3000:

```bash
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
```

---

## Step 3: Test CRUD Operations

### Test 1: Create an Accommodation

1. Navigate to http://localhost:3000/accommodations
2. Click the **"Add Accommodation"** button (top right)
3. Fill in the form:
   - **Name:** Test Accommodation
   - **Category:** Apartment
   - **Condition:** Good
   - **Number of Rooms:** 3
   - **Host:** Select any host from dropdown
4. Click **"Add"** button
5. ✅ Verify: New accommodation appears in the grid

### Test 2: Edit an Accommodation

1. On the accommodations page, click **"Edit"** on any card
2. Modify the **Name** field (e.g., add " - Updated")
3. Click **"Update"** button
4. ✅ Verify: Card shows updated name immediately

### Test 3: Delete an Accommodation

1. On the accommodations page, click **"Delete"** on any card
2. Confirmation dialog appears
3. Click **"Delete"** to confirm
4. ✅ Verify: Card disappears from grid

### Test 4-6: Repeat Tests 1-3 for Hosts

1. Navigate to http://localhost:3000/hosts
2. Same workflow: Add → Edit → Delete

### Test 7-9: Repeat Tests 1-3 for Countries

1. Navigate to http://localhost:3000/countries
2. Same workflow: Add → Edit → Delete

---

## Test Cases Summary

| Entity        | Create | Read  | Update | Delete | Status   |
|---------------|--------|-------|--------|--------|----------|
| Accommodations| ⬜ Test | ✅ Auto | Test  | ⬜ Test | Ready |
| Hosts         | ⬜ Test | ✅ Auto | ⬜ Test | ⬜ Test | Ready |
| Countries     | ⬜ Test | ✅ Auto | ⬜ Test | ⬜ Test | Ready |

---

## Expected Behavior

### On Create
```
User Input Form → API Call → Database Insert → Data Refetch → Grid Update
```

### On Edit
```
Pre-filled Form → API Call → Database Update → Data Refetch → Grid Update
```

### On Delete
```
Confirm Dialog → API Call → Database Delete → Data Refetch → Grid Update
```

### Loading States
- Page shows "Loading..." spinner while fetching data
- Dialog shows form in loading state while submitting
- Buttons are disabled during submission

### Error Handling
- API errors display in error message areas
- Failed operations don't refetch data
- User can retry failed operations

---

## Browser Console Checks

Open DevTools (F12) and check the **Console** tab for any error messages. Expected clean console with no errors.

---

## API Endpoints Used

```
GET    /api/accommodations           - Fetch all
GET    /api/accommodations/{id}      - Fetch one
POST   /api/accommodations/add       - Create (requires ADMIN)
PUT    /api/accommodations/{id}/edit - Update (requires ADMIN)
DELETE /api/accommodations/{id}/delete - Delete (requires ADMIN)

GET    /api/hosts                    - Fetch all
GET    /api/hosts/{id}               - Fetch one
POST   /api/hosts/add                - Create (requires ADMIN)
PUT    /api/hosts/{id}/edit          - Update (requires ADMIN)
DELETE /api/hosts/{id}/delete        - Delete (requires ADMIN)

GET    /api/countries                - Fetch all
GET    /api/countries/{id}           - Fetch one
POST   /api/countries/add            - Create (requires ADMIN)
PUT    /api/countries/{id}/edit      - Update (requires ADMIN)
DELETE /api/countries/{id}/delete    - Delete (requires ADMIN)
```

---

## Troubleshooting

### Port Conflict (3000)
```bash
# Check what's using port 3000
netstat -ano | findstr :3000

# Kill the process
taskkill /PID <PID> /F
```

### CORS Errors
- Ensure `localhost:3000` is in backend CORS config
- Check JwtWebSecurityConfig.java corsConfigurationSource()

### 404 Errors on API
- Verify backend is running on `localhost:8080`
- Check API endpoints in browser Network tab

### Data Not Updating
- Check browser console for JavaScript errors
- Verify backend logs for API errors
- Ensure JWT token is valid (if using authentication)

### Form Validation
- All fields are required
- Number fields validate input type
- Form error messages should be clear

---

## Success Criteria

✅ All tests pass if:
1. Create operation adds new item to grid
2. Edit operation updates card immediately
3. Delete operation removes card from grid
4. No JavaScript errors in console
5. API calls visible in Network tab
6. Load times reasonable (~100-300ms for API)
7. Form validation works correctly

---

## Performance Notes

- Initial page load: ~1-2 seconds (including API call)
- Add/Edit/Delete operations: ~500-1000ms (with refetch)
- Grid rendering: ~100ms
- Animation transitions: Smooth (no jank)

---

## Next Steps After Testing

1. ✅ Test all CRUD operations manually
2. ✅ Verify data persistence in database
3. ✅ Check error scenarios (invalid inputs, API failures)
4. ✅ Review code quality and architecture
5. ✅ Prepare for production deployment


