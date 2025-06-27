import { useState, useEffect } from "react";
import { topNavMeuItems } from "../../app/config/config";
import { LYHeader, SliderHeader, SearchField, MenuCards } from "../../widgets";

export default function Menu() {
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("")

  // Дебаунсинг поискового запроса
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 300) // 300мс задержка

    return () => clearTimeout(timer)
  }, [searchQuery])

  const handleSearchChange = (query: string) => {
    console.log('Menu received search query:', query)
    setSearchQuery(query)
  }

  return (
    <div className="menu--page">
      <LYHeader text="Love You" />
      <SliderHeader data={topNavMeuItems} />
      <SearchField
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <MenuCards searchQuery={debouncedSearchQuery} />
    </div>
  )
}
