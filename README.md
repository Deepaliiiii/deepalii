Dynamic License Status Dashboard (HTML/CSS/JS)  A responsive, single-page dashboard built with HTML, CSS, and vanilla JavaScript to track and manage multiple license statuses across different companies and locations. Features an automated alert system for FSSAI expiry dates.
# 📑 License Status Dashboard

This project is a single-page, dynamic web application designed to track and manage the validity of multiple company licenses (FSSAI, Shop & Establishment, etc.) across various warehouses.

### Key Features:

* **Responsive Design**: Built with pure HTML/CSS, ensuring scrollable data tables are functional on both desktop and mobile devices.
* **Triple-Action Filtering**: Users can simultaneously filter data using three criteria:
    1.  **Global Search** (by any keyword).
    2.  **Location Filter** (by city/area).
    3.  **Status Filter** (by urgency level).
* **Automated Expiry Alerts**: JavaScript automatically calculates the time remaining until the FSSAI license expiry and assigns a color-coded status:
    * 🔴 **EXPIRED**
    * 🟠 **CRITICAL** (0-30 days remaining)
    * 🟡 **Expiring Soon** (31-90 days remaining)
    * 🟢 **OK** (> 90 days remaining)
* **Sticky Columns**: The first two columns (`Company` and `License Status Alert`) remain visible while scrolling horizontally through the extensive license data.
