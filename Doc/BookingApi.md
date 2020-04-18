# ScrapProduct Api


| Method                             | HTTP request          | Description
| [**getProduct**](#createbooking)| **POST** /api/ScrapProduct/ |Search and Scrap  Product From EcommerceWebsite   |

### Example

```javascript
const wrapper = require('mobile-movies-api-wrapper')
const config = {
  MOBILE_MOVIES_API_URL,
  authToken,
  exhibitorCode
}
const client = wrapper(config)

const reqBody = {
  memberSessionId: '351041ca-1a92-41fa-bf71-56408b470b65',
  bookingItem: {
    id: '65423',
    theaterId: '7869',
    bookingItemType: 'Showtime'
  }
}
const authToken = 'vSD45gbEgd5ggevbxjhg4655bvE='
const exhibitorCode = 'Prospector'

// Promise model
client
  .createBooking(reqBody, authToken, exhibitorCode)
  .then((result) => console.log(result.body, result.status))
  .catch((err) => console.log(err))

// Async / await model
await client.createBooking(reqBody, authToken, exhibitorCode)
```

### Parameters

| Name              | Type                                                              | Description                             |
| ----------------- | ----------------------------------------------------------------- | --------------------------------------- |
| **reqBody**       | [**CreateBookingSessionRequest**](CreateBookingSessionRequest.md) | the create booking session request data |
| **authToken**     | String                                                            | the optional authorization token        |
| **exhibitorCode** | String                                                            | the optional exhibitor code             |

### Return type

[**CreateBookingSessionResponseApiResponse**](CreateBookingSessionResponseApiResponse.md)

### Authorization

**Basic**

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

