import { useEffect, useState } from 'react'

interface Iuser {
  id: number
  name: string
  lastName: string
  age: number
}

const defaultUser = {
  id: 999,
  name: '___',
  lastName: '___',
  age: 999
}
const App = () => {
  const props = 'stream'
  const eventSource = new EventSource(`http://localhost:5555/${props}`)

  const [user, setUser] = useState<Iuser>()
  useEffect(() => {
    eventSource.onmessage = event => {
      console.log(event.data)
      setUser(JSON.parse(event.data))
    }
    eventSource.onerror = error => {
      console.log('hay un error con el evento SSE', error)
    }
  }, [])

  return (
    <div>
      <p>{JSON.stringify(user)}</p>
      <p>{user?.id}</p>
      <p>{user?.name}</p>
      <p>{user?.lastName}</p>
      <p>{user?.age}</p>
      <p>Url: {eventSource.url}</p>
    </div>
  )
}

export default App
