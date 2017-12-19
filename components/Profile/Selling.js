import React from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { Icon, SearchBar } from 'react-native-elements'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import List from '../utils/List'
// https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6
// http://rationalappdev.com/react-native-list-app-complete-how-to-guide/
import { posts_per_page } from '../../constants'

export default graphql(
  gql`
    query List($limit: Int, $offset: Int, $filter: JSON) {
      Posts(limit: $limit, offset: $offset, filter: $filter) {
        id
        title
        description
        price
        createdAt
        likes {
          id
        }
        user {
          id
          displayName
          phoneNumber
        }
        files {
          id
          url
        }
      }
    }
  `,
  {
    options: props => {
      return {
        variables: {
          offset: 0,
          limit: posts_per_page,
          filter: {
            where: {
              userId: props.screenProps.userId
            }
          }
        }
      }
    }
  }
)(List)