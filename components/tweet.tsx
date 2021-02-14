import React from 'react'
import cs from 'classnames'
import useSWR from 'swr'

import { useTwitter } from '../static-tweet/twitter'
import Node from '../static-tweet/components/html/node'
import components from '../static-tweet/components/twitter-layout/components'
import twitterTheme from '../static-tweet/components/twitter-layout/twitter.module.css'

export const Tweet: React.FC<{
  id: string
  br?: string
  caption?: string
  className?: string
}> = ({ id, br, caption, className }) => {
  const twitter = useTwitter()
  const { data: tweetAst } = useSWR(
    id,
    (id) => twitter.tweetAstMap[id] || twitter.swrOptions.fetcher(id),
    twitter.swrOptions
  )

  console.log('tweetAst', id, tweetAst)

  // const tweet = useTweet(id)

  // // Happens when `getStaticProps` is traversing the tree to collect the tweet ids
  // if (!tweet || tweet.ignore) return null

  return (
    <main className={cs(twitterTheme.theme, className)}>
      {tweetAst && (
        <>
          <Node components={components} node={tweetAst[0]} br={br} />

          {caption != null ? <p>{caption}</p> : null}
        </>
      )}

      <style jsx>{`
        main {
          width: 100%;
          max-width: 550px;
          min-width: 220px;
          margin: 2rem auto;
        }

        p {
          font-size: 14px;
          color: #999;
          text-align: center;
          margin: 0;
          margin-top: 10px;
          padding: 0;
        }
      `}</style>
    </main>
  )
}
