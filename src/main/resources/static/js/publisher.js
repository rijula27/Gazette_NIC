$(document).ready(function () {
    const allowedPattern = /^[0-9IXVABPDFixvabpdf\s.\-]*$/;

    $('#searchInput').on('input', function () {
        let value = $(this).val();

        // Clean input
        if (!allowedPattern.test(value)) {
            value = value.replace(/[^0-9IXVABPDFixvabpdf\s.\-]/g, '');
            $(this).val(value);
        }

        let cleanedValue = value.trim().toLowerCase();

        if (cleanedValue === '') {
            $('#noResultsRow').show();
            resetTable();
            resetPagination();
            return;
        }

        let hasResults = false;
        $('.dashboard-table tbody tr').each(function () {
            if (this.id === 'noResultsRow') return;

            let title = $(this).find('td').eq(1).text().toLowerCase();
            let date = $(this).find('td').eq(2).text().toLowerCase();
            let part = $(this).find('td').eq(3).text().toLowerCase();

            if (title.includes(cleanedValue) || date.includes(cleanedValue) || part.includes(cleanedValue)) {
                $(this).show();
                hasResults = true;
            } else {
                $(this).hide();
            }
        });

        $('#noResultsRow').toggle(!hasResults);
    });

    $('#searchInput').on('keydown', function (e) {
        if (e.key === 'Backspace') {
            setTimeout(() => {
                let val = $(this).val().trim();
                if (val === '') {
                    $('#noResultsRow').show();
                    resetTable();
                    resetPagination();
                }
            }, 0);
        }
    });

    function resetTable() {
        $('.dashboard-table tbody tr').each(function () {
            if (this.id !== 'noResultsRow') {
                $(this).show();
            }
        });
        $('#noResultsRow').hide();
    }

    function resetPagination() {
        // Replace this with actual pagination logic
        console.log('Pagination reset');
    }
});









document.addEventListener("DOMContentLoaded", () => {
    console.log("executing file size  block")
    const fileInput = document.getElementById("editPdfFile");
    
    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        const maxSize = 10 * 1024 * 1024; // 10MB in bytes

        if (file) {
            if (file.size > maxSize) {
                Swal.fire({
                    icon: "error",
                    title: "File Too Large",
                    text: "The file size exceeds the 10MB limit.",
                }); 
                event.target.value = ""; // Clear the file input
            }
        }
    });
});
 
 
 // Client-side pagination (adjust rows per page as needed)
 $(document).ready(function () {
    const rowsPerPage = 5;
    let currentPage = 0;
    const paginationControls = $('#paginationControls');

    function showPage(rows, page) {
        rows.hide();
        rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage).show();
    }

    function createPagination(filteredRows) {
        const pageCount = Math.ceil(filteredRows.length / rowsPerPage);
        paginationControls.empty();

        if (pageCount > 1) {
            const prevBtn = $('<button class="page-link">Previous</button>');
            const nextBtn = $('<button class="page-link">Next</button>');

            function updateButtons() {
                prevBtn.prop('disabled', currentPage === 0);
                nextBtn.prop('disabled', currentPage === pageCount - 1);
            }

            prevBtn.on('click', function () {
                if (currentPage > 0) {
                    currentPage--;
                    showPage(filteredRows, currentPage);
                    updateButtons();
                }
            });

            nextBtn.on('click', function () {
                if (currentPage < pageCount - 1) {
                    currentPage++;
                    showPage(filteredRows, currentPage);
                    updateButtons();
                }
            });

            paginationControls.append(prevBtn, nextBtn);
            updateButtons();
        }
    }

    function applyPagination() {
        const visibleRows = $('#gazetteTableBody tr:visible').not('#noResultsRow');
        if (visibleRows.length > 0) {
            $('#noResultsRow').hide();
            currentPage = 0;
            showPage(visibleRows, currentPage);
            createPagination(visibleRows);
        } else {
            $('#noResultsRow').show();
            paginationControls.empty();
        }
    }

    applyPagination();






    // Search input
    $('#searchInput').on('input', function () {
        let value = $(this).val().replace(/[^0-9IXVABPDFixvabpdf\s.\-]/g, '');
        $(this).val(value);
        const cleanedValue = value.trim().toLowerCase();

        if (cleanedValue === '') {
            $('#noResultsRow').show();
            $('#gazetteTableBody tr').not('#noResultsRow').show();
            applyPagination();
            return;
        }

        let hasResults = false;
        $('#gazetteTableBody tr').each(function () {
            if (this.id === 'noResultsRow') return;

            let title = $(this).find('td').eq(1).text().toLowerCase();
            let date = $(this).find('td').eq(2).text().toLowerCase();
            let part = $(this).find('td').eq(3).text().toLowerCase();

            const match = title.includes(cleanedValue) || date.includes(cleanedValue) || part.includes(cleanedValue);
            $(this).toggle(match);
            if (match) hasResults = true;
        });

        $('#noResultsRow').toggle(!hasResults);
        applyPagination(); // Reapply pagination to new filtered results
    });

    $('#searchInput').on('keydown', function (e) {
        if (e.key === 'Backspace') {
            setTimeout(() => {
                if ($(this).val().trim() === '') {
                    $('#noResultsRow').show();
                    $('#gazetteTableBody tr').not('#noResultsRow').show();
                    applyPagination();
                }
            }, 0);
        }
    });
});




// Delete confirmation modal logic
var deleteId; // Store the gazette id for deletion
function confirmDelete(el) {
    deleteId = $(el).data('id');
    Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleting...",
                text: "Please wait...",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                    
                    $.ajax({
                        url: '/publisher/publisher_delete/' + deleteId,
                        type: 'GET',
                        success: function(response) {
                            Swal.fire({
                                title: "Deleted!",
                                text: response.message, // Show success message from server
                                icon: "success",
                                timer: 2000,
                                showConfirmButton: false
                            }).then(() => {
                                location.reload(); // Refresh after success
                            });
                        },
                        error: function(xhr) {
                            Swal.fire({
                                title: "Error!",
                                text: "Failed to delete the gazette.",
                                icon: "error"
                            });
                        }
                    });
                
                }
            });
        }
    });

}



var sendId;
function sendBack_Creator(el){
    sendId = $(el).data('id');
    Swal.fire({
        title: "Confirm Send?",
        text: "Do you want to send this to the creator?",
        icon: "question",
        showCancelButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, send it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Sending...",
                text: "Please wait while the document is being sent.",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
            
                    $.ajax({
                        url: '/publisher/sendBack_Creator/' + sendId,
                        type: 'GET', // Use 'POST' if needed
                        success: function(response) {
                            Swal.fire({
                                title: "Send!",
                                text: response.message, // Show success message from server
                                icon: "success",
                                timer: 2000,
                                showConfirmButton: false
                            }).then(() => {
                                location.reload(); // Refresh after success
                            });
                        },
                        error: function(xhr) {
                            Swal.fire({
                                title: "Error!",
                                text: "Failed to send the gazette.",
                                icon: "error"
                            });
                        }
                    });
                }
            });
        }
    });
}




var publishedId;
function published(el){
    publishedId = $(el).data('id');
    Swal.fire({
        title: "Confirm Published?",
        text: "Do you want to published this gazette?",
        icon: "question",
        showCancelButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, publish it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Publishing...",
                text: "Please wait while the document is being publish.",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
            
                    $.ajax({
                        url: '/publisher/published/' + publishedId,
                        type: 'GET', // Use 'POST' if needed
                        success: function(response) {
                            Swal.fire({
                                title: "Published!",
                                text: response.message, // Show success message from server
                                icon: "success",
                                timer: 2000,
                                showConfirmButton: false
                            }).then(() => {
                                location.reload(); // Refresh after success
                            });
                        },
                        error: function(xhr) {
                            Swal.fire({
                                title: "Error!",
                                text: "Failed to published the gazette.",
                                icon: "error"
                            });
                        }
                    });
                }
            });
        }
    });
}




// edit open

function openEditModal(el) {
    var id = $(el).data('id');
    var part = $(el).data('part');

    $('#gazetteId').val(id);
    $('#editPart').val(part);
    $('#editPdfFile').val('');  // Clear file input

    $('#editModal').modal('show');
}

function confirmEdit() {
    $('#editModal').modal('hide');
    $('#confirmEditModal').modal('show');
}


// confirm edit
function confirmEdit() {
    $('#editModal').modal('hide');
    Swal.fire({
        title: "Confirm Edit?",
        text: "Do you want to update this gazette?",
        icon: "info",
        showCancelButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonColor: "#17a2b8",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!"
    }).then((result) => {
        if (result.isConfirmed) {
            submitEditForm();
        }
    });
}

function submitEditForm() {
    var formData = new FormData($('#editForm')[0]);

    Swal.fire({
        title: "Updating...",
        text: "Please wait while the gazette is being updated.",
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
            $.ajax({
                url: '/gazette/edit',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    Swal.fire({
                        title: "Success!",
                        text: "Gazette updated successfully!",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false
                    }).then(() => {
                        location.reload();
                    });
                },
                error: function(xhr) {
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to update gazette: " + xhr.responseText,
                        icon: "error"
                    });
                }
            });
        }
    });
}


const toggleBtn = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
    });
