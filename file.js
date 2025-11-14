        document.addEventListener('DOMContentLoaded', () => {

            const searchInput = document.getElementById('searchInput');
            const locationFilter = document.getElementById('locationFilter');
            const statusFilter = document.getElementById('statusFilter'); // NEW REFERENCE
            const addLicenseBtn = document.getElementById('addLicenseBtn');
            const allDataRows = document.querySelectorAll('.data-row');
            
            // --- Helper Function: Check Expiry Status ---
            function getExpiryStatus(expiryDateStr) {
                if (!expiryDateStr || expiryDateStr.toLowerCase().includes('n/a') || expiryDateStr.toLowerCase().includes('applied') || expiryDateStr.toLowerCase().includes('direct') || expiryDateStr.trim() === '') {
                    return { text: 'N/A', class: 'status-na', raw: 'n/a' };
                }

                // Extract the end date part (handles "start to end" or "till date")
                let datePart = expiryDateStr;
                if (expiryDateStr.includes('to')) {
                    datePart = expiryDateStr.split('to').pop().trim();
                } else if (expiryDateStr.includes('till')) {
                    datePart = expiryDateStr.split('till').pop().trim();
                }
                
                // Remove any non-date characters like "validity"
                datePart = datePart.replace(/validity|till|to/gi, '').trim();

                // Attempt to parse the date (DD-MM-YYYY format)
                const parts = datePart.match(/(\d{2})[-/](\d{2})[-/](\d{4})/);
                if (!parts) {
                    return { text: 'Check Date', class: 'status-na', raw: 'n/a' };
                }
                
                // Date constructor expects YYYY, MM-1, DD
                const expiryDate = new Date(parts[3], parts[2] - 1, parts[1]);
                
                const today = new Date();
                today.setHours(0, 0, 0, 0); 

                // Calculate difference in days
                const timeDiff = expiryDate.getTime() - today.getTime();
                const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

                if (dayDiff < 0) {
                    return { text: 'EXPIRED', class: 'status-expired', raw: 'expired' };
                } else if (dayDiff <= 30) {
                    return { text: `CRITICAL (${dayDiff} days)`, class: 'status-critical', raw: 'critical' };
                } else if (dayDiff <= 90) {
                    return { text: `Expiring Soon (${dayDiff} days)`, class: 'status-warning', raw: 'expiring soon' };
                } else {
                    return { text: 'OK', class: 'status-ok', raw: 'ok' };
                }
            }

            // --- Function to Process and Update Status Cells ---
            function processStatusAlerts() {
                allDataRows.forEach(row => {
                    const expiryCell = row.querySelector('[data-expiry-type="fssai"]');
                    const statusIndicatorCell = row.querySelector('.status-indicator');
                    
                    if (expiryCell && statusIndicatorCell) {
                        const expiryText = expiryCell.textContent;
                        const status = getExpiryStatus(expiryText);
                        
                        // Set the text content and CSS class
                        statusIndicatorCell.textContent = status.text;
                        statusIndicatorCell.className = 'status-indicator ' + status.class;
                        
                        // Add a data attribute for easier filtering (e.g., data-status="critical")
                        statusIndicatorCell.setAttribute('data-status', status.raw);
                    }
                });
            }


            // --- Main Filter Function ---
            function filterRows() {
                const searchTerm = searchInput.value.toLowerCase();
                const selectedLocation = locationFilter.value.toLowerCase();
                const selectedStatus = statusFilter.value.toLowerCase(); // NEW FILTER VALUE
                
                allDataRows.forEach(row => {
                    const rowText = row.textContent.toLowerCase();
                    const rowLocationCell = row.querySelector('.location-cell');
                    const rowStatusCell = row.querySelector('.status-indicator'); // Get the status cell
                    
                    const rowLocation = rowLocationCell ? rowLocationCell.textContent.toLowerCase() : '';
                    const rowStatus = rowStatusCell ? rowStatusCell.getAttribute('data-status') : 'n/a'; // Get status from data attribute
                    
                    // Filter 1: Search Term
                    const matchesSearch = rowText.includes(searchTerm);
                    
                    // Filter 2: Location
                    const matchesLocation = (selectedLocation === 'all') || rowLocation.includes(selectedLocation);

                    // Filter 3: Status (Handles both 'N/A' and the specific status checks)
                    const matchesStatus = (selectedStatus === 'all') || (rowStatus === selectedStatus);

                    // Show if all three filters match
                    if (matchesSearch && matchesLocation && matchesStatus) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            }
            
            // --- Initialization ---
            processStatusAlerts(); 
            searchInput.addEventListener('input', filterRows);
            locationFilter.addEventListener('change', filterRows);
            statusFilter.addEventListener('change', filterRows); // NEW LISTENER

            addLicenseBtn.addEventListener('click', () => {
                alert('This button would open a form to add a new license record.');
            });
            
        });