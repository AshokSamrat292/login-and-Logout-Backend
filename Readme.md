// nodemon is use for automatically restart the server when we make changes in the code else we 
  // have to restart the server manually after every change. there we write "stert: "npm run index.js" in the terminal to start the server. and after that we can make changes in the code and save it then nodemon will automatically restart the server and we can see the changes in the browser without manually restarting the server. 



  # HTTP 
  HTTP stands for Hypertext Transfer Protocol. It is a protocol used for transmitting data over the internet. It is the foundation of data communication on the World Wide Web. HTTP defines how messages are formatted and transmitted, and how web servers and browsers should respond to various commands. 

  When you enter a URL in your web browser, it sends an HTTP request to the server where the website is hosted. The server then processes the request and sends back an HTTP response, which contains the requested web page or resource. HTTP is a stateless protocol, meaning that each request from a client to a server is treated as an independent transaction. This allows for efficient communication and scalability on the web.

  Http header : HTTP headers are key-value pairs that are sent between the client and server in an HTTP request or response. They provide additional information about the request or response, such as content type, encoding, caching directives, and more. HTTP headers are used to convey important information about the request or response, such as the type of data being sent, the length of the content, and any authentication credentials. They play a crucial role in the communication between clients and servers, allowing for proper handling of requests and responses. Some common HTTP headers include "Content-Type", "Content-Length", "Authorization", and "User-Agent".

  # HTTTP methods 
          : HTTP methods, also known as HTTP verbs, are a set of request methods used in the Hypertext Transfer Protocol (HTTP) to indicate the desired action to be performed on a resource. The most commonly used HTTP methods include:
  - GET: Used to retrieve data from a server. It is a read-only operation and should not have any side effects on the server.
  - POST: Used to submit data to be processed by a server. It is typically used for creating new resources or submitting forms.
  - PUT: Used to update an existing resource on the server. It replaces the entire resource with the new data provided in the request.
  - DELETE: Used to delete a resource from the server.
  - PATCH: Used to partially update an existing resource on the server. It allows for updating specific fields without replacing the entire resource.
  - HEAD: Similar to GET, but it only retrieves the headers of a resource without the body. It is often used for checking the existence of a resource or retrieving metadata.
  - OPTIONS: Used to describe the communication options for a resource. It is often used in preflight requests in CORS (Cross-Origin Resource Sharing) to determine if the actual request is safe to send.
  - TRACE: Used to perform a message loop-back test along the path to the target resource. It is primarily used for diagnostic purposes.
  - CONNECT: Used to establish a tunnel to the server identified by the target resource. It is often used for secure connections (HTTPS) through a proxy server.
  These HTTP methods allow clients to interact with resources on a server in a standardized way, enabling the creation of RESTful APIs and facilitating communication between clients and servers on the web.

 # HTTP status codes
                 : HTTP status codes are three-digit numbers that indicate the outcome of an HTTP request. They are sent by the server in response to a client's request and provide information about the success or failure of the request. Some common HTTP status codes include:
   . 1XX - Informational: These status codes indicate that the request has been received and is being processed. Examples include 100 (Continue) and 101 (Switching Protocols).
   . 2XX - Success: These status codes indicate that the request was successful and the server has returned the requested data. Examples include 200 (OK), 201 (Created), and 204 (No Content).
   . 3XX - Redirection: These status codes indicate that the client must take additional action to complete the request. Examples include 301 (Moved Permanently), 302 (Found), and 304 (Not Modified).
   . 4XX - Client Error: These status codes indicate that there was an error with the client's request. Examples include 400 (Bad Request), 401 (Unauthorized), and 404 (Not Found).
   . 5XX - Server Error: These status codes indicate that there was an error on the server while processing the request. Examples include 500 (Internal Server Error), 502 (Bad Gateway), and 503 (Service Unavailable).
   HTTP status codes are essential for understanding the outcome of an HTTP request and for troubleshooting issues that may arise during communication between clients and servers on the web. They provide valuable information about the success or failure of a request and help developers and users understand the state of their interactions with web resources.