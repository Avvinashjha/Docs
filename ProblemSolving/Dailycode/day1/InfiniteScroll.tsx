import { useEffect, useState, useCallback, useRef } from 'react'
import { List, useListRef } from 'react-window'
import Loader from '../../components/Loader'
import type { ApiResponse, Data } from '../../types/data'
import { get } from '../../services/baseApi'

const ITEM_HEIGHT = 80 // Height of each row in pixels
const ITEMS_PER_PAGE = 10

function InfiniteScrollList() {
  const [data, setData] = useState<Data[]>([])
  const [offset, setOffset] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const listRef = useListRef(null)
  const isLoadingRef = useRef(false)

  useEffect(() => {
    if (isLoadingRef.current || !hasMore) return
    
    isLoadingRef.current = true
    setLoading(true)
    
    get(`http://localhost:5050/data?limit=${ITEMS_PER_PAGE}&offset=${offset}`)
      .then((response: ApiResponse) => {
        setData((prevState) => [...prevState, ...response.data])
        setHasMore(response.pagination.hasNext)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
      .finally(() => {
        setLoading(false)
        isLoadingRef.current = false
      })
  }, [offset, hasMore])

  // Callback when rows are rendered - used to trigger infinite scroll
  const handleRowsRendered = useCallback(
    (visibleRows: { startIndex: number; stopIndex: number }) => {
      if (loading || !hasMore) return

      // Load more when we're close to the end (within 5 items)
      if (visibleRows.stopIndex >= data.length - 5 && !isLoadingRef.current) {
        setOffset((prev) => prev + ITEMS_PER_PAGE)
      }
    },
    [data.length, loading, hasMore]
  )

  // Row component renderer
  // Custom props that will be passed via rowProps
  type CustomRowProps = {
    items: Data[]
    loading: boolean
  }

  const RowComponent = ({
    index,
    style,
    items,
    loading: isLoading
  }: {
    index: number
    style: React.CSSProperties
    ariaAttributes: {
      'aria-posinset': number
      'aria-setsize': number
      role: 'listitem'
    }
  } & CustomRowProps) => {
    const item = items[index]

    if (!item) {
      return (
        <div style={style}>
          <div
            style={{
              padding: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {isLoading && <Loader />}
          </div>
        </div>
      )
    }

    return (
      <div style={style}>
        <div
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            margin: '5px 10px',
            borderRadius: '4px',
            backgroundColor: '#fff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}
        >
          <strong>
            {item.first_name} {item.last_name}
          </strong>
          <div style={{ fontSize: '14px', color: '#666' }}>
            Email: {item.email}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {data.length === 0 && loading ? (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Loader />
        </div>
      ) : (
        <>
          <List
            listRef={listRef}
            defaultHeight={window.innerHeight}
            rowComponent={RowComponent}
            rowCount={data.length + (loading && data.length > 0 ? 1 : 0)}
            rowHeight={ITEM_HEIGHT}
            rowProps={{ items: data, loading }}
            onRowsRendered={handleRowsRendered}
            overscanCount={5}
          />
          {!hasMore && data.length > 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '20px',
                color: '#666',
                fontSize: '14px'
              }}
            >
              No more data to load
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default InfiniteScrollList
