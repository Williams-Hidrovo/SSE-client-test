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
  const props2 = 'test'
  //const eventSource = new EventSource(`http://localhost:5555/${props}`)
  const eventSource = new EventSource(`https://sse.dev/${props2}`)

  const [user, setUser] = useState(null)
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
      <p>user.now:{user?.now}</p>
      <p>Url: {eventSource.url}</p>
      <p>{eventSource.readyState}</p>
    </div>
  )
}

export default App
