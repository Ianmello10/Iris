
import { MDXRemote } from 'next-mdx-remote/rsc'
import React from 'react'




export default function CustomMDX() {
  return (
    <MDXRemote
      source={`# Hello World

      This is from Server Components!
      `}
    />
  )
}