import React from "react"
import { User } from "../types/Types"
export type ComponentContextData = {
	user: User //Fullfill this objetct with user infos here.
}

const context = React.createContext<Partial<ComponentContextData>>({})
const { Consumer, Provider } = context

export { context as ComponentContext }
export { Consumer as ComponentContextConsumer }
export { Provider as ComponentContextProvider }

