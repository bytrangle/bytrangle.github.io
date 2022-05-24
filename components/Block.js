import { Fragment } from "react"
import Link from "next/link"
import Text from "./Text"
import renderNestedList from "./NestedList"

const renderBlock = (block) => {
  const { type, id } = block
  const value = block[type]
  switch(type) {
    case "paragraph":
      return (<Text text={value.rich_text}/>)
    case "heading_1":
      return (<h1><Text text={value.rich_text}/></h1>)
    case "heading_2":
      return (<h2><Text text={value.rich_text}/></h2>)
    case "heading_3":
      return (<h3><Text text={value.rich_text}/></h3>)
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li>
          <Text text={value.text} />
          {!!value.children && renderNestedList(block)}
        </li>
      )
    case "to_do":
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{" "}
            <Text text={value.text}/>
          </label>
        </div>
      )
    case "toggle":
      return (
        <details>
          <summary>
            <Text text={value.text} />
          </summary>
          {value.children?.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </details>
      )
    case "child_page":
      return <p>{value.title}</p>
    case "image":
      const src = value.type === "external" ? value.external.url : value.file.url
      const caption = value.caption ? value.caption[0]?.plain_text : ""
      return (
        <figure>
          <img src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      )
    case "divider":
      return <hr key={id} />
    case "quote":
      return <blockquote key={id}>{value.text[0].plain_text}</blockquote>
    case "code":
      return(
        <pre className="pre">
          <code className="code_block" key={id}>
            {value.rich_text[0]?.text.content}
          </code>
        </pre>
      )
    case "file":
      const src_file =
        value.type === "external" ? value.external.url : value.file.url;
      const splitSourceArray = src_file.split("/");
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const caption_file = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure>
          <div className="file">
            📎{" "}
            <Link href={src_file} passHref>
              {lastElementInArray.split("?")[0]}
            </Link>
          </div>
          {caption_file && <figcaption>{caption_file}</figcaption>}
        </figure>
      );
    case "bookmark":
      const href = value.url
      return (
        <a href={ href } target="_brank" className="bookmark">
          { href }
        </a>
      );
    default: {
      let response = ''
      if (type === 'unsupported') {
        response = `This block is unsupported by Notion API`
      } else {
        response = `Block type ${type} is not supported yet.`
      }
      return response
    }
  }
}

export default renderBlock