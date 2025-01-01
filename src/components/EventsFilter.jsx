import React, { useState } from 'react';
import { Calendar, ChevronDown, User } from 'lucide-react';

const EventsFilter = ({ onSearch, onDateChange, onSort }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [date, setDate] = useState('');
  const [sortBy, setSortBy] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    onDateChange(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    onSort(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
      {/* Search and Date Filters */}
      <div className="flex flex-col sm:flex-row gap-4 flex-2">
        <div className="relative flex-1">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Type an event name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="relative min-w-[200px]">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            className="w-full pl-10 pr-4 py-2 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
      </div>

      {/* Sort Dropdown */}
      <div className="relative min-w-[200px]">
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="w-full pl-4 pr-10 py-2 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          <option value="">Sort by</option>
          <option value="date">Date</option>
          <option value="price">Price</option>
          <option value="name">Name</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
      </div>
    </div>
  );
};

export default EventsFilter;
