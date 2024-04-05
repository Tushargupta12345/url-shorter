document.addEventListener('DOMContentLoaded', function() {
    const inputUrl = document.getElementById('input-url');
    const actionBtn = document.getElementById('shorten-btn');
    const form = document.querySelector('.form');

    function isValidHttpUrl(string) {
        let url;
        
        try {
            url = new URL(string);
        } catch (_) {
            return false;  
        }

        return url.protocol === "http:" || url.protocol === "https:";
    }

    actionBtn.addEventListener('click', function() {
        if (actionBtn.value === "Copy") {
            navigator.clipboard.writeText(inputUrl.value).then(() => {
                alert('Url copied!');
                window.location.reload();
            });
        } else {
            const urlToShorten = inputUrl.value.trim();
            if (isValidHttpUrl(urlToShorten)) {
                inputUrl.style.color = 'black';
                inputUrl.placeholder = '';
                actionBtn.value = "Shortening...";
                actionBtn.disabled = true;

                const apiUrl = encodeURI('https://urli.tech/api?url=' + urlToShorten);
                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        const shortUrl = data.ShortenedUrl;
                        inputUrl.value = shortUrl;
                        actionBtn.value = "Copy";
                        actionBtn.disabled = false;
                    })
                    .catch(() => {
                        inputUrl.value = '';
                        inputUrl.placeholder = 'An error occurred';
                        actionBtn.value = "Shorten";
                        actionBtn.disabled = false;
                    });
            } else {
                inputUrl.value = '';
                inputUrl.placeholder = 'Enter a valid http or https URL';
            }
        }
    });
});
