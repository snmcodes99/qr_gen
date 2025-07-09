$(document).ready(function() {
    $('#qr-form').submit(function(event) {
        event.preventDefault();
        var url = $('#UrlInput').val();
        console.log('URL entered:', url);
        $.ajax({
        url: 'http://localhost:8001/',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({url}),
        success: function(data) {
            console.log('Server response:', data);
            window.location.href = `qr.html?file=${data.file}`;
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
        }
        });
    });
});