[NAV](https://docs.genius.com/)

* [Manage Clients](http://genius.com/api-clients)
* [Support Forum](http://genius.com/api-support)
* [TOS](http://genius.com/static/terms)

* Getting Started

* Resources

+ Annotations
+ Referents
+ Songs
+ Artists
+ Web Pages
+ Search
+ Account

* Authentication

* Response Format

# Getting Started

> **These Docs are a Genius App**
>
> Interactively explore API endpoints by connecting your Genius account to this page. Learn how your app can access Genius's content and community this easily too!
>
>
>
>
> Authorize With Genius

> **You've linked your Genius account with this site. You're on your way to building something great!**

> **Add Genius Annotations To Your Own Site**
>
> In addition to interacting with Genius annotations through the API, it's easy to make any page annotatable and display annotations you've created on it. Just add the script tag:
>
>
> `<script src="https://genius.codes"></script>`

### Registering Your Application

First, visit the Genius [API Client management page](http://genius.com/api-clients) and create an API client for your application. This will provide you with a **`client_id`** and a **`client_secret`** that you'll use to identify your application to Genius. The **`redirect_uri`** is used for authenticating Genius users with your application. You can change it later. The API Client will belong to the user account signed in to Genius when it's created.

### Making Requests

The available endpoints are listed below in the resources section, along with embedded examples showing how they work and what they return.

Genius uses OAuth2 for authentication. All API requests must be authenticated. There are plenty of libraries available to help with this part of your integration. There's also a [detailed guide below](https://docs.genius.com/#/authentication-h1) if you're committed to implementing it yourself.

Looking for an OAuth2 client library?

* **Clojure**
  + [clauth](https://github.com/pelle/clauth)
* **Cocoa & Cocoa Touch**
  + [OAuth2Client](https://github.com/nxtbgthng/OAuth2Client)
* **Go**
  + [OAuth2 for Go](https://github.com/golang/oauth2)
* **Haskell**
  + [hoauth2](https://github.com/freizl/hoauth2)
* **Java**
  + [Apache Oltu](http://oltu.apache.org/)
  + [scribe-java](https://github.com/fernandezpablo85/scribe-java)
* **JavaScript**
  + [simple-oauth2](https://github.com/andreareginato/simple-oauth2)
  + [Passport](http://passportjs.org/)
* **PHP**
  + [PHP-OAuth2](https://github.com/adoy/PHP-OAuth2)
* **Python**
  + [rauth](https://github.com/litl/rauth)
  + [sanction](https://github.com/demianbrecht/sanction)
* **.Net**
  + [Owin](http://www.nuget.org/packages/Microsoft.Owin.Security.OAuth)
* **Qt/C++**
  + [O2](https://github.com/pipacs/o2)
* **Ruby**
  + [OmniAuth](https://github.com/intridea/omniauth)
  + [intridea/oauth2](https://github.com/intridea/oauth2)
  + [Faraday + Faraday Middleware](https://github.com/lostisland/faraday_middleware)
* **Scala**
  + [play-silhouette](https://github.com/mohiva/play-silhouette)

# Resources

## Annotations

An **annotation** is a piece of content about a part of a document. The document may be a *song* (hosted on Genius) or a *web page* (hosted anywhere). The part of a document that an annotation is attached to is called a *referent*.

Annotation data returned from the API includes both the substance of the annotation and the necessary information for displaying it in its original context.

> api.genius.com/
>
> Try It
> Authorization: Bearer
>
> See details about using an access token in the [authentication section](https://docs.genius.com/#/using-an-access-token) below.
>
>
> ```
>
>
> ```
>
>
>
> Authenticate with the Docs App to Try

#### GET /annotations/:id

Data for a specific annotation.

|  |  |
| --- | --- |
| **`id`** | ID of the annotation |
| **`text_format`** | Format for text bodies related to the document. One or more of `dom`, `plain`, and `html`, separated by commas (defaults to `dom`). See details of each option [here](https://docs.genius.com/#response-format-h1) |

#### POST /annotations

**Requires scope: `create_annotation`**

Creates a new annotation on a public web page. The returned value will be the new annotation object, in the same form as would be returned by [`GET /annotation/:id`](https://docs.genius.com/#/annotation-show) with the new annotation's ID.

```
Example Payload:

```

```
{
  "annotation": {
    "body": {
      "markdown": "hello **world!**"
    }
  },
  "referent": {
    "raw_annotatable_url": "http://seejohncode.com/2014/01/27/vim-commands-piping/",
    "fragment": "execute commands",
    "context_for_display": {
      "before_html": "You may know that you can ",
      "after_html": " from inside of vim, with a vim command:"
    }
  },
  "web_page": {
    "canonical_url": null,
    "og_url": null,
    "title": "Secret of Mana"
  }
}

```

|  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| **`annotation`** [show child params](https://docs.genius.com/)   |  |  |  |  | | --- | --- | --- | --- | | **`body`** [show child params](https://docs.genius.com/)   |  |  | | --- | --- | | **`markdown`**   Required | The text for the note, in [markdown](https://help.github.com/articles/github-flavored-markdown/) | | | | |
| **`referent`** [show child params](https://docs.genius.com/)   |  |  | | --- | --- | | **`raw_annotatable_url`**   Required | The original URL of the page | | **`fragment`**   Required | The highlighted fragment | | **`context_for_display`** [show child params](https://docs.genius.com/)   |  |  | | --- | --- | | **`before_html`** | The HTML before the highlighted fragment (prefer up to 200 characters) | | **`after_html`** | The HTML after the highlighted fragment (prefer up to 200 characters) | | | | |
| **`web_page`**  At least one required [show child params](https://docs.genius.com/)   |  |  | | --- | --- | | **`canonical_url`** | The `href` property of the `<link rel="canonical">` tag on the page. Including it will help make sure newly created annotation appear on the correct page | | **`og_url`** | The `content` property of the `<meta property="og:url">` tag on the page. Including it will help make sure newly created annotation appear on the correct page | | **`title`** | The title of the page | | |

#### PUT /annotations/:id

**Requires scope: `manage_annotation`**

Updates an annotation created by the authenticated user. Accepts the same parameters as [`POST /annotation`](https://docs.genius.com/#/annotation-create) above.

#### DELETE /annotations/:id

**Requires scope: `manage_annotation`**

Deletes an annotation created by the authenticated user.

#### PUT /annotations/:id/upvote

**Requires scope: `vote`**

Votes positively for the annotation on behalf of the authenticated user.

#### PUT /annotations/:id/downvote

**Requires scope: `vote`**

Votes negatively for the annotation on behalf of the authenticated user.

#### PUT /annotations/:id/unvote

**Requires scope: `vote`**

Removes the authenticated user's vote (up or down) for the annotation.

## Referents

**Referents** are the sections of a piece of content to which *annotations* are attached. Each referent is associated with a *web page* or a *song* and may have one or more annotations. Referents can be searched by the document they are attached to or by the user that created them.

When a new annotation is created either a referent is created with it or that annotation is attached to an existing referent.

> api.genius.com/
>
> Try It
> Authorization: Bearer
>
> See details about using an access token in the [authentication section](https://docs.genius.com/#/using-an-access-token) below.
>
>
> ```
>
>
> ```
>
>
>
> Authenticate with the Docs App to Try

#### GET /referents

Referents by content item or user responsible for an included annotation.

You may pass only one of `song_id` and `web_page_id`, not both.

|  |  |
| --- | --- |
| **`created_by_id`** | ID of a user to get referents for |
| **`song_id`** | ID of a song to get referents for |
| **`web_page_id`** | ID of a web page to get referents for |
| **`text_format`** | Format for text bodies related to the document. One or more of `dom`, `plain`, and `html`, separated by commas (defaults to `dom`). See details of each option [here](https://docs.genius.com/#response-format-h1) |
| **`per_page`** | Number of results to return per request |
| **`page`** | Paginated offset, (e.g., `per_page=5&page=3` returns songs 11–15) |

## Songs

A **song** is a document hosted on Genius. It's usually music lyrics.

Data for a song includes details about the document itself and information about all the *referents* that are attached to it, including the text to which they refer.

> api.genius.com/
>
> Try It
> Authorization: Bearer
>
> See details about using an access token in the [authentication section](https://docs.genius.com/#/using-an-access-token) below.
>
>
> ```
>
>
> ```
>
>
>
> Authenticate with the Docs App to Try

#### GET /songs/:id

Data for a specific song.

|  |  |
| --- | --- |
| **`id`** | ID of the song |
| **`text_format`** | Format for text bodies related to the document. One or more of `dom`, `plain`, and `html`, separated by commas (defaults to `dom`). See details of each option [here](https://docs.genius.com/#response-format-h1) |

## Artists

An **artist** is how Genius represents the creator of one or more *songs* (or other documents hosted on Genius). It's usually a musician or group of musicians.

> api.genius.com/
>
> Try It
> Authorization: Bearer
>
> See details about using an access token in the [authentication section](https://docs.genius.com/#/using-an-access-token) below.
>
>
> ```
>
>
> ```
>
>
>
> Authenticate with the Docs App to Try

#### GET /artists/:id

Data for a specific artist.

|  |  |
| --- | --- |
| **`id`** | ID of the artist |
| **`text_format`** | Format for text bodies related to the document. One or more of `dom`, `plain`, and `html`, separated by commas (defaults to `dom`). See details of each option [here](https://docs.genius.com/#response-format-h1) |

> api.genius.com/
>
> Try It
> Authorization: Bearer
>
> See details about using an access token in the [authentication section](https://docs.genius.com/#/using-an-access-token) below.
>
>
> ```
>
>
> ```
>
>
>
> Authenticate with the Docs App to Try

#### GET /artists/:id/songs

Documents (songs) for the artist specified. By default, 20 items are returned for each request.

|  |  |
| --- | --- |
| **`id`** | ID of the artist. |
| **`sort`** | `title` (default) or `popularity` |
| **`per_page`** | Number of results to return per request |
| **`page`** | Paginated offset, (e.g., `per_page=5&page=3` returns songs 11–15) |

## Web Pages

A **web page** is a single, publicly accessible page to which annotations may be attached. Web pages map 1-to-1 with unique, canonical URLs.

> api.genius.com/
>
> Try It
> Authorization: Bearer
>
> See details about using an access token in the [authentication section](https://docs.genius.com/#/using-an-access-token) below.
>
>
> ```
>
>
> ```
>
>
>
> Authenticate with the Docs App to Try

#### GET /web\_pages/lookup

Information about a web page retrieved by the page's full URL (including protocol). The returned data includes Genius's ID for the page, which may be used to look up associated referents with the [`/referents`](https://docs.genius.com/#/referents-index) endpoint.

Data is only available for pages that already have at least one annotation.

Provide as many of the following variants of the URL as possible:

|  |  |
| --- | --- |
| **`raw_annotatable_url`** | The URL as it would appear in a browser |
| **`canonical_url`** | The URL as specified by an appropriate `<link>` tag in a page's `<head>` |
| **`og_url`** | The URL as specified by an `og:url` `<meta>` tag in a page's `<head>` |

## Search

The **search** capability covers all content hosted on Genius (all *songs*).

> api.genius.com/
>
> Try It
> Authorization: Bearer
>
> See details about using an access token in the [authentication section](https://docs.genius.com/#/using-an-access-token) below.
>
>
> ```
>
>
> ```
>
>
>
> Authenticate with the Docs App to Try

#### GET /search

Search documents hosted on Genius.

|  |  |
| --- | --- |
| **`q`** | The term to search for |

## Account

**Account** information includes general contact information and Genius-specific details about a user.

> api.genius.com/
>
> Try It
> Authorization: Bearer
>
> See details about using an access token in the [authentication section](https://docs.genius.com/#/using-an-access-token) below.
>
>
> ```
>
>
> ```
>
>
>
> Authenticate with the Docs App to Try

#### GET /account

**Requires scope: `me`**

Account information for the currently authenticated user.

|  |  |
| --- | --- |
| **`text_format`** | Format for text bodies related to the document. One or more of `dom`, `plain`, and `html`, separated by commas (defaults to `dom`). See details of each option [here](https://docs.genius.com/#response-format-h1) |

# Authentication

> **Access for Apps Without Users**
> If your application doesn't include user-specific behaviors you can use the *client* access token associated with your API instead of tokens for authenticated users. These tokens are only valid for read-only endpoints that are not restricted by a [required scope](https://docs.genius.com/#/available-scopes).
>
> You can get a client access token by clicking "Generate Access Token" on the API Client management page.

Genius uses the OAuth2 standard for making API calls on behalf of individual users. Requests are authenticated with an **Access Token** sent in an HTTP header (or as a request parameter if you must).

All interaction with the API must be done over HTTPS.

> An example request would look like this:

> ```
> https://api.genius.com/oauth/authorize?
> client_id=YOUR_CLIENT_ID&
> redirect_uri=YOUR_REDIRECT_URI&
> scope=REQUESTED_SCOPE&
> state=SOME_STATE_VALUE&
> response_type=code
>
> ```

### Getting an Access Token

Start by directing a user of your application to Genius's authentication page at `https://api.genius.com/oauth/authorize` with the following query parameters:

* **`client_id`**: Your application's Client ID, as listed on the API Client management page
* **`redirect_uri`**: The URI Genius will redirect the user to after they've authorized your application; it must be the same as the one set for the API client on the management page
* **`scope`**: The permissions your application is requesting as a space-separated list (see [available scopes](https://docs.genius.com/#/available-scopes) below)
* **`state`**: A value that will be returned with the code redirect for maintaining arbitrary state through the authorization process
* **`response_type`**: Always "code"

> **More About State**
> One important use for this value is increased security—by including a unique, difficult to guess value (say, a hash of a user session value), potential attackers can be prevented from sending phony redirects to your app.

On the authentication page the user can choose to allow your application to access Genius on their behalf. They'll be asked to sign in (or, if necessary, create an account) first. Then the user is redirected to `https://YOUR_REDIRECT_URI/?code=CODE&state=SOME_STATE_VALUE`.

Your application can exchange the `code` query parameter from the redirect for an access token by making a `POST` request to `https://api.genius.com/oauth/token` with the following request body data:

```
{
  "code": "CODE_FROM_REDIRECT",
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET",
  "redirect_uri": "YOUR_REDIRECT_URI",
  "response_type": "code",
  "grant_type": "authorization_code"
}

```

* **`code`**: The `code` query parameter from the redirect to your `redirect_uri`
* **`client_secret`**: Your application's Client Secret, as listed on the API Client management page
* **`grant_type`**: Aways "authorization\_code"
* **`client_id`**: As above
* **`redirect_uri`**: As above
* **`response_type`**: As above

Most of these are the same values as used in the initial request.

```
{
  "access_token": "ACCESS_TOKEN"
}

```

The response body will be an object with the token as the value for the `access_token` key. Save the token and use it to make requests on behalf of the authorizing user.

Building a client-only application?

An alternative authentication flow is available for browser-based, client-only applications. *This mechanism is much less secure than the full code exchange process and should only be used by applications without a server or native platform to execute the full code flow.*

Where "code" is used as the `response_type` value in the instructions above, use `token`. Instead of being redirected with a code that your application exchanges for an access token, the user is redirected to `https://REDIRECT_URI/#access_token=ACCESS_TOKEN&state=STATE`. Extract the access token from the URL hash fragment and use it to make requests.

With the token response type, the user's access token is exposed in the browser, where it could be accessed by malicious JavaScript or otherwise intercepted much more easily than when it's only exchanged between servers. The client secret isn't used, so it's much easier for potential attackers to fake authorization requests. Don't use the token flow if you don't have to.

### Available Scopes

Access tokens can only be used for resources that are covered by the scopes provided when they created. These are the available scopes and the endpoints they grant permission for:

| Scope | Endpoints |
| --- | --- |
| `me` | [`GET /account`](https://docs.genius.com/#account-show) |
| `create_annotation` | [`POST /annotations`](https://docs.genius.com/#annotations-create) |
| `manage_annotation` | [`PUT /annotations/:id`](https://docs.genius.com/#annotations-update)   [`DELETE /annotations/:id`](https://docs.genius.com/#annotations-destroy) |
| `vote` | [`PUT /annotations/:id/upvote`](https://docs.genius.com/#annotations-upvote)   [`PUT /annotations/:id/downvote`](https://docs.genius.com/#annotations-downvote)   [`PUT /annotations/:id/unvote`](https://docs.genius.com/#annotations-unvote) |

### Using An Access Token

```
GET /some-endpoint HTTP/1.1
User-Agent: CompuServe Classic/1.22
Accept: application/json
Host: api.genius.com
Authorization: Bearer ACCESS_TOKEN

```

To make authenticated requests with an access token, include it in an HTTP `Authorization` header preceded by the word "Bearer" and a space. For example, the value of the header could be `Bearer 1234tokentokentoken`.

Passing the token in the authorization header is the preferred way to authenticate API requests. However, the API also supports providing the token as the `access_token` query parameter of a `GET` request or element of a `POST` body.

# Response Format

```
GET https://api.genius.com/web_pages/lookup?canonical_url=http://example.com

```

```
{
  "meta": {
    "status": 200
  },
  "response": {
    "web_page": {
      "annotation_count":7,
      "id": 1480,
      ...
    }
  }
}

```

All Genius API responses are JSON. Every JSON response has a `meta` field with a `status` value that is an integer representation of the HTTP status code for the response.

For successful requests, there is also a top-level `response` field which will be a nested object. For example, a request for details about annotations on a web page:

### Errors

```
GET https://api.genius.com/apples

```

```
{
  "meta": {
    "status": 404,
    "message": "Not found"
  }
}

```

If a request fails or errors (i.e. the `status` values is 4xx or 5xx). the `meta` field will also have a `message` value that is a string with details about the error. For example, a request to a non-existent API endpoint:

### Text Formatting (`text_format` option)

```
{
  "plain": "A hilarious word!",
  "html": "<p>A hilarious word!</p>",
  "dom": {
    "tag": "root",
    "children": [ {
      "tag": "p",
      "children": [ "A hilarious word!" ]
    } ]
  }
}

```

Many API requests accept a `text_format` query parameter that can be used to specify how text content is formatted. The value for the parameter must be one or more of `plain`, `html`, and `dom`. The value returned will be an object with key-value pairs of formats and results:

* **`plain`** is just plain text, no markup
* **`html`** is a string of unescaped HTML suitable for rendering by a browser
* **`dom`** is a nested object representing and HTML DOM hierarchy that can be used to programmatically present structured content