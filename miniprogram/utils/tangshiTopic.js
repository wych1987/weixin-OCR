import {tangshi} from "../api/tangshi";

export function getTopic(){
  const random  = (Math.random()*100000 %tangshi.length).toFixed();
  const answer = tangshi[random];
  const paragraphs = [];
  answer.paragraphs.forEach(item=>{
    const res = item.split(/[。？！]/);
    paragraphs.push(...res.filter((item)=>item.length));
  })
  answer.title = answer.title.split("/")[0]
  answer.paragraphs=paragraphs;
  return answer;
}