interface BasicBTNProps {
  imgUrl: string
  title: string
  color: string
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const BasicBTN = ({ title, color, imgUrl }: BasicBTNProps) => {
  return (
    <div className="action">
      <a href="#" target="_blank" rel="noreferrer" style={{ color: color }}>
        {title}
      </a>
      <img src={imgUrl} alt="" />

    </div>
  )
}
