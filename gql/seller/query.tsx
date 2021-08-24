import { gql } from '@apollo/client';

export const GET_STORE = gql`
  query GetStore($id: String) {
    getStore(id: $id) {
      _id
      shopName
      tags
      userCustomTags
      address
      rating
      restaurantRating
      category
      logo
      image
      phone
      ttp
      isOpen
      reviewsCount
      restaurantReviewsCount
      paymentMethods
      services
      estimatedCost {
        cost
        customerInteger
      }
      deliveryServices {
        name
        icon
        url
        label
        value
      }
      deliveryRadius {
        _id
        radiusKm
        customerDeliveryCharge
        vendorDeliveryCharge
      }
      mashkorMaxRadius
      minDeliveryOrderValue
      location {
        _id
        longitude
        latitude
      }
      storeHours {
        opening
        closing
      }
      socialMedia {
        facebook
        instagram
        twitter
        snapchat
      }
      socialId
      deliveryETA {
        min
        max
      }
      comingSoon
      products {
        _id
        shopName
        products {
          _id
          category
          image
          name
          tags
          price
          description
          options {
            _id
            category
            maxSelect
            minSelect
            optionsList {
              _id
              name
              price
            }
          }
        }
      }
    }
  }
`;

export const GET_BEST_SELLING_STORES = gql`
  query GetBestSellingStoresCursor($cursor: String, $limit: Int) {
    getBestSellingStoresCursor(cursor: $cursor, limit: $limit) {
      data {
        _id
        shopName
        address
        rating
        reviewsCount
        category
        isOpen
        image
        tags
        ttp
        location {
          longitude
          latitude
        }
        comingSoon
        promoCodes {
          _id
          type {
            name
            value
          }
        }
      }
      next
      nextCursor
    }
  }
`;

export const GET_SIMILAR_STORE = gql`
  query getSimilarStores($storeId: String!, $useTags: Boolean, $useCategory: Boolean, $options: PaginationOptions) {
    getSimilarStores(storeId: $storeId, useTags: $useTags, useCategory: $useCategory, options: $options) {
      data {
        shopName
        _id
        address
        rating
        reviewsCount
        category
        isOpen
        image
        tags
        ttp
        location {
          longitude
          latitude
        }
        comingSoon
        promoCodes {
          _id
          type {
            name
            value
          }
        }
      }
      nextPage
      hasNextPage
    }
  }
`;

export const GET_COLLECTIONS = gql`
  query getAllCollections {
    getAllCollections {
      _id
      name
      description
      sellers {
        data {
          _id
          shopName
          address
          rating
          isOpen
          tags
          location {
            longitude
            latitude
          }
          ttp
          image
          reviewsCount
          comingSoon
        }
        next
        nextCursor
      }
      bannerImage
    }
  }
`;
