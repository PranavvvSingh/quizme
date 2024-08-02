"use client"

import React from "react"
import WordCloud from "react-d3-cloud"

interface CloudData {
   id: number
   topic: string
   created_at: string
}

const Cloud = ({ data }: { data: CloudData[] }) => {
   const wordData = data.map((item, index) => {
      return { text: item.topic, value: index }
   })
   return (
      <WordCloud
         data={wordData}
         width={500}
         height={400}
         font="sans-serif"
         // fontStyle="italic"
         // fontWeight="bold"
         fontSize={(word) => Math.log2(word.value) * 5 + 16}
         spiral="rectangular"
         rotate={0}
         padding={10}
         random={()=>0.5}
         fill={"var(--svg-color)"}
         // onWordClick={(event, d) => {
         //    console.log(`onWordClick: ${d.text}`)
         // }}
         // onWordMouseOver={(event, d) => {
         //    console.log(`onWordMouseOver: ${d.text}`)
         // }}
         // onWordMouseOut={(event, d) => {
         //    console.log(`onWordMouseOut: ${d.text}`)
         // }}
      />
   )
}

export default Cloud
