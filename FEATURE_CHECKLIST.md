# TaskFlow - Feature Checklist

Use this checklist to verify all features are working after setup.

## 🔐 Authentication

- [ ] Sign up with new account works
- [ ] Login with credentials works
- [ ] Logout clears token
- [ ] Protected routes redirect to login
- [ ] Invalid credentials show error message
- [ ] Password min 6 characters enforced
- [ ] Email uniqueness validation works

## 📊 Dashboard

- [ ] Punch In button visible when not punched in
- [ ] Punch Out button visible when punched in
- [ ] Live timer displays after punch in
- [ ] Timer increments every second
- [ ] Punch times recorded correctly (HH:MM format)
- [ ] Today's task count shows 0 if no tasks
- [ ] Task completion stats calculate correctly
- [ ] Avg duration shows correct calculation
- [ ] Project lead name displays
- [ ] Quality reviewer name displays
- [ ] Warning banner shows if not punched in

## ✅ My Tasks Page

- [ ] Start New Task form visible
- [ ] Task ID input accepts numbers
- [ ] Project dropdown populated
- [ ] Start Task button disabled if not punched in
- [ ] Start Task creates task in database
- [ ] Today's Task Log shows new task
- [ ] Task status badge displays correctly
- [ ] Duration shows 0m initially
- [ ] Complete button appears for active tasks
- [ ] Cancel button appears for active tasks
- [ ] Complete task updates duration
- [ ] Cancel task stops tracking
- [ ] My Projects grid shows all projects
- [ ] Project cards show correct info

## 🎯 All Tasks Page

- [ ] Search bar filters by task ID
- [ ] Status dropdown filters correctly
- [ ] Date range picker works
- [ ] Quick date buttons (7d, 14d, 30d, 90d) work
- [ ] Tasks grouped by project
- [ ] Group header shows task counts
- [ ] Completed count accurate
- [ ] Active count accurate
- [ ] AHT calculation correct
- [ ] Duration color coding:
  - [ ] Green (≤5m)
  - [ ] Blue (6-15m)
  - [ ] Amber (>15m)
- [ ] CSV export button works
- [ ] CSV contains correct headers
- [ ] CSV data matches displayed tasks

## 📁 Projects Page

- [ ] List shows all assigned projects
- [ ] Project name displays
- [ ] LIVE badge visible
- [ ] ALLOCATED badge visible
- [ ] Type label shows STEM or NON_STEM
- [ ] Platform shows "Multimango"
- [ ] Lead name displays
- [ ] Reviewer name displays
- [ ] Cards have hover effect

## 📋 Attendance Page

- [ ] Today's record visible at top (if punched in)
- [ ] Search by name filters correctly
- [ ] Status dropdown filters (present, absent, leave)
- [ ] Date range filtering works
- [ ] CSV export contains all records
- [ ] Punch In time shows correctly
- [ ] Punch Out time shows correctly
- [ ] Hours worked calculated correctly
- [ ] Location shows "Remote"
- [ ] All records display in table
- [ ] Table headers are clear

## 🗓️ Leave Management

- [ ] "+ Apply Leave" button visible
- [ ] Modal opens on button click
- [ ] Leave type dropdown has 4 options
- [ ] Start date picker works
- [ ] End date picker works
- [ ] Reason textarea accepts input
- [ ] Can't apply for past dates
- [ ] Submit creates leave record
- [ ] Pending tab shows pending leaves
- [ ] Approved tab shows approved leaves
- [ ] Rejected tab shows rejected leaves
- [ ] All tab shows everything
- [ ] Admin sees approve/reject buttons
- [ ] Admin can approve leave
- [ ] Admin can reject leave
- [ ] Leave status updates correctly

## 🔔 Notifications

- [ ] Bell icon visible in top bar
- [ ] Unread count badge displays
- [ ] Click bell opens notification panel
- [ ] Notifications list shows
- [ ] No notifications message appears when empty
- [ ] Notification count decreases when marked read
- [ ] Notifications auto-close panel on click

## 🎨 UI/UX

- [ ] Dark theme throughout
- [ ] Text readable (good contrast)
- [ ] Sidebar fixed on left
- [ ] Top bar fixed at top
- [ ] Main content scrolls
- [ ] Active nav item highlighted
- [ ] Hover states work
- [ ] Buttons show loading spinner
- [ ] Forms show errors
- [ ] Empty states display properly
- [ ] Skeleton loaders appear while loading
- [ ] Toast notifications appear for actions
- [ ] Modal dialogs center properly
- [ ] Tables responsive
- [ ] Colors match spec:
  - [ ] Background #0D1117
  - [ ] Cards #161B22
  - [ ] Accent #00C896

## 🔧 Technical

- [ ] Backend runs on port 3000
- [ ] Frontend runs on port 5173
- [ ] JWT tokens stored in localStorage
- [ ] API requests include Authorization header
- [ ] CORS working (no blocked requests)
- [ ] Database connection successful
- [ ] Seed data created (admin + member + 3 projects)
- [ ] API responds in expected format
- [ ] Error messages displayed to user
- [ ] Console has no critical errors

## 🧪 Test Workflow

Complete this workflow to test all features:

1. **Login**
   - [ ] Login as admin@taskflow.com / admin123
   - [ ] Dashboard displays
   - [ ] Welcome message shows name

2. **Punch In**
   - [ ] Click Punch In button
   - [ ] Time recorded (HH:MM)
   - [ ] Timer starts counting
   - [ ] Punch In button changes to Punch Out

3. **Start Task**
   - [ ] Go to My Tasks
   - [ ] Enter Task ID: "512571"
   - [ ] Select a project
   - [ ] Click Start Task
   - [ ] Task appears in Today's Log
   - [ ] Status shows "ACTIVE"

4. **Complete Task**
   - [ ] Click "Complete" button
   - [ ] Duration shows elapsed time
   - [ ] Status changes to "COMPLETED"
   - [ ] Dashboard stats update

5. **View All Tasks**
   - [ ] Go to All Tasks page
   - [ ] See completed task in table
   - [ ] Time colored correctly (blue probably)
   - [ ] Try filters and search

6. **Punch Out**
   - [ ] Go to Dashboard
   - [ ] Click Punch Out
   - [ ] Punch Out time recorded
   - [ ] Timer stops

7. **Apply Leave**
   - [ ] Go to Leaves page
   - [ ] Click + Apply Leave
   - [ ] Fill form
   - [ ] Submit
   - [ ] Leave appears in Pending tab

8. **Admin Approval**
   - [ ] Logout (Sign Out)
   - [ ] Login as admin
   - [ ] Go to Leaves
   - [ ] See member's leave
   - [ ] Click Approve/Reject
   - [ ] Status updates
   - [ ] Logout admin

9. **Check Attendance**
   - [ ] Login as member again
   - [ ] Go to Attendance page
   - [ ] See today's punch records
   - [ ] Hours worked calculated
   - [ ] Export CSV

## 🐛 Bug Check

- [ ] No console errors (F12 → Console)
- [ ] No 404 errors in network tab
- [ ] No CORS errors
- [ ] Buttons don't double-click
- [ ] Forms don't submit twice
- [ ] Spinners disappear after loading
- [ ] Toasts disappear after 3 seconds
- [ ] Modal closes on button click
- [ ] Sidebar doesn't overlap content
- [ ] Top bar doesn't overlap content

## 📱 Responsive Check

- [ ] Desktop view works (1920px+)
- [ ] Tablet view works (1024px)
- [ ] Mobile view works (375px)
- [ ] Navigation accessible on mobile
- [ ] Tables scroll on mobile
- [ ] Forms fill mobile screens
- [ ] Buttons easily tappable

## ✅ Final Verification

- [ ] All features working
- [ ] No console errors
- [ ] No missing files
- [ ] Build completes successfully
- [ ] Ready for deployment

---

## Notes

- Check browser console (F12) for any JavaScript errors
- Check Network tab for failed API requests
- Check Application → Storage for localStorage token
- Test on different screen sizes
- Test on different browsers (Chrome, Firefox, Safari, Edge)

## Deployment Checklist

- [ ] All features verified working
- [ ] MongoDB Atlas setup and connection working
- [ ] JWT_SECRET configured
- [ ] .env files created
- [ ] Root package.json scripts working
- [ ] `npm run build` completes without errors
- [ ] `npm start` starts server successfully
- [ ] Railway variables configured
- [ ] Push to GitHub
- [ ] Railway deployment successful
- [ ] Can access live URL
- [ ] Can login at live URL

---

Good luck with your TaskFlow deployment! 🚀
