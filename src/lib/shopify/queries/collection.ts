import { shopifyFetch } from "..";
import productFragment from "../fragments/product";
import seoFragment from "../fragments/seo";

const collectionFragment = /* GraphQL */ `
  fragment collection on Collection {
    handle
    title
    description
    image {
      altText
      url
    }
    seo {
      ...seo
    }
    updatedAt
    products(first: 100) {
      edges {
        node {
          id
        }
      }
    }
  }
  ${seoFragment}
`;

export const getCollectionQuery = /* GraphQL */ `
  query getCollection($handle: String!) {
    collection(handle: $handle) {
      ...collection
    }
  }
  ${collectionFragment}
`;

export const getCollectionsQuery = /* GraphQL */ `
  query getCollections {
    collections(first: 100, sortKey: TITLE) {
      edges {
        node {
          ...collection
        }
      }
    }
  }
  ${collectionFragment}
`;

export const getCollectionProductsQuery = /* GraphQL */ `
  query getCollectionProducts(
    $handle: String!
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
    $filterCategoryProduct: [ProductFilter!]
  ) {
    collection(handle: $handle) {
      products(
        sortKey: $sortKey
        reverse: $reverse
        first: 100
        filters: $filterCategoryProduct
      ) {
        edges {
          node {
            ...product
          }
        }
      }
    }
  }
  ${productFragment}
`;
