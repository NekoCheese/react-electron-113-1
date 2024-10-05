import { Button } from "@chakra-ui/react"
import { useState } from "react"

interface MyCounterProps {
  color: string
  countValue: number
  shadow: boolean
  onFinished: () => any
}

export const MyCounter = ({ color, countValue, shadow }: MyCounterProps) => {
  // Model
  // 此處資料不直接操作，透過"控制器存取資料"
  const [getCounter, setCounter] = useState<number>(countValue)

  // Controller
  function btnEventController(): void {
    setCounter(getCounter + 1)
  }

  // View
  return (
    <div className={` ${shadow ? 'shadow-lg' : ''}`}>
      <Button className={`text-3xl font-bold text-${color}-700 underline'`}>
        {getCounter.toString()}
      </Button>
      <Button onClick={btnEventController}>+1</Button>
      <Button
        onClick={() => {
          setCounter(0)
        }}
      >
        Reset
      </Button>
      <div className="text-blue-700"></div>
      <div className="text-red-700"></div>
      <div className="text-green-700"></div>
    </div>
  )
}