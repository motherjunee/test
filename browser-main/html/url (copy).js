const overwrites = {
  "www.youtube.com": "yt.stonklat.com",
  "youtube.com": "yt.stonklat.com"
};

function isWebsite(input) {
    if (validator.isURL(input)) {
        console.info("The provided input is indeed a URL")
        return true;
    } else {
        console.info("The provided input is is NOT a URL")
        return false;
    }
}

// Function from uv source code to encode the url into the ultraviolet XOR encryption standard
function encode(str) {
    if (!str) return str;
    return encodeURIComponent(
        str
            .toString()
            .split('')
            .map((char, ind) =>
                ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char
            )
            .join('')
    );
}; 


function createURL(str) {
    const proxyURL = "https://p.stonklat.com/uv/service/"
    let nURI = str.trim();
    console.info(nURI);

    const searchEngineURLs = {
        'duckduckgo': "https://duckduckgo.com/?q=",
        'bing': "https://www.bing.com/search?q=",
        'yahoo': "https://search.yahoo.com/search?p=",
        'brave': "https://search.brave.com/search?q=",
        'yandex': "https://yandex.com/search/?text=",
        'ask': "https://www.ask.com/web?q=",
        'qwant': "https://www.qwant.com/?q=",
        'naver': "https://search.naver.com/search.naver?query=",
        'dog': "https://www.dogpile.com/serp?q=",
        'aol': "https://search.aol.co.uk/aol/search?q="
    };

    const selectedEngine = document.getElementById('searchEngine').value;
    let searchEngineURL = searchEngineURLs[selectedEngine] || "https://www.google.com/search?q=";


  
    if (!isWebsite(nURI)) {
        console.info("USING SEARCH ENGINE: " + selectedEngine);
        nURI = searchEngineURL + nURI.replace(/\s+/g, '+');
    } else if (!nURI.startsWith("http://") && !nURI.startsWith("https://")) {
        console.info("USING URL: " + nURI);
        nURI = "https://" + nURI;
    } 

  
    const matchingKey = Object.keys(overwrites).find(key => nURI.includes(key));
    if (matchingKey) {
      console.info(`URI overwritten from "${nURI}" to`)
      nURI = nURI.replace(matchingKey, overwrites[matchingKey])
      console.log(nURI)
    }
  

    
    function getHostnameFromURL(urlString) {
      var parser = document.createElement('a');
      parser.href = urlString;
      var parts = parser.hostname.split('.');
      if(parts.length > 2) {
        return parts.slice(1).join('.');
      } else {
        return parser.hostname;
      }
    }
  
    const domain = getHostnameFromURL(nURI);
    const proxyDomain = getHostnameFromURL(proxyURL);
  

    if (domain == proxyDomain) {
      console.info("No need to proxy!")
      var URL = nURI
    } else {
      console.info(`Using ${proxyDomain} as proxy.`)
      // Encode the URI
      nURI = encode(nURI)
      var URL = proxyURL + nURI
    }
    
    return URL;
}

