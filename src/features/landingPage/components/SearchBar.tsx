'use client'
import { Input } from '@/components/ui/Input'
import React, { useState } from 'react'

const SearchBar = () => {
    const [search, setSearch] = useState<string>("")

    return (
        <Input className="w-1/2" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
    )
}

export default SearchBar