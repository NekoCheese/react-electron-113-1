interface BlockProps {
  children: React.ReactNode
}

export const BasicBlock = ({ ...props }: BlockProps): React.ReactElement => {
  return <div className="border rounded-md m-3 shadow-md">{props.children}</div>
}
