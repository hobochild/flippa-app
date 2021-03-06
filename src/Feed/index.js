import React from 'react'
import { Icon } from 'react-native-elements'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { List } from '../components'
import { posts_per_page } from '../constants'
import { theme } from '../constants'
// https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6
// http://rationalappdev.com/react-native-list-app-complete-how-to-guide/
List.navigationOptions = {
  // Note: By default the icon is only shown on iOS. Search the showIcon option below.
  tabBarIcon: ({ tintColor, focused }) => {
    return (
      <Icon color={focused ? tintColor : theme.colors.grayDark} name="home" />
    )
  }
}

export const feedQuery = gql`
  query feedQuery($limit: Int, $offset: Int) {
    Posts: Feed(limit: $limit, offset: $offset) {
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
`

export default graphql(feedQuery, {
  options: {
    variables: {
      offset: 0,
      limit: posts_per_page
    }
  }
})(List)
