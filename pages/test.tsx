import React from 'react'
// import { Twitter } from '../static-tweet/twitter'
import fetchTweetAst from 'static-tweet/lib/fetchTweetAst'
import { Tweet } from 'components/tweet'

// const tweetId = '1238918791947522049'
// const tweetId = '1358199505280262150'
const tweetId = '1358581276576391172'

export const getStaticProps = async () => {
  try {
    const tweetAst = await fetchTweetAst(tweetId)

    return {
      props: {
        tweetId,
        tweetAst
      },
      revalidate: 10
    }
  } catch (err) {
    console.error('error', err)

    throw err
  }
}

export default function NotionDomainPage({ tweetId, tweetAst }) {
  return <Tweet id={tweetId} ast={tweetAst} />
}
