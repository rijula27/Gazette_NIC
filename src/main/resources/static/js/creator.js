
    // File Picker Logic
    document.getElementById('selectFileBtn').addEventListener('click', () => {
        document.getElementById('pdfFile').click();
    });

    document.getElementById('pdfFile').addEventListener('change', (event) => {
        const fileName = event.target.files[0] ? event.target.files[0].name : 'No file selected';
        document.getElementById('fileLabel').textContent = fileName;
    });

   


    



    //toggle script
    const toggleBtn = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
    });


    // Pdf file size validation

    document.getElementById('pdfFile').addEventListener('change', (event) => {
        const file = event.target.files[0];
        const maxSize = 10 * 1024 * 1024; // 10MB in bytes

        if (file) {
            if (file.size > maxSize) {
                Swal.fire({
                    icon: 'error',
                    title: 'File Too Large',
                    text: 'The file size exceeds the 10MB limit.',
                }); 
                event.target.value = ''; // Clear the file input
                document.getElementById('fileLabel').textContent = 'No file selected';
            } else {
                document.getElementById('fileLabel').textContent = file.name;
            }
        }
    });




// loading and confirmation
    document.getElementById('saveButton').addEventListener('click', function() {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to submit this gazette?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, submit it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Show loading animation
                Swal.fire({
                    title: 'Uploading...',
                    text: 'Please wait while your gazette is being uploaded.',
                    icon: 'info',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                setTimeout(() => {
                    document.getElementById('gazette-form').submit();
                }, 1500);
            }
        });
    });


    // api call display
    document.addEventListener("DOMContentLoaded", () => {
        const urlParams = new URLSearchParams(window.location.search);

        if (urlParams.has('success')) {
            Swal.fire({
                title: 'Upload Successful!',
                text: urlParams.get('success'),
                icon: 'success',
                confirmButtonColor: '#28a745',
                timer: 3000,
                showConfirmButton: false
            });
        }

        if (urlParams.has('error')) {
            Swal.fire({
                title: 'Upload Failed!',
                text: urlParams.get('error'),
                icon: 'error',
                confirmButtonColor: '#d33'
            });
        }

        const newUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
    });
