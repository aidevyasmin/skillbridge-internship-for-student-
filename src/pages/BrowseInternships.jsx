import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, DollarSign, Clock, Filter, Heart, Loader2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import InternshipCard from '../components/InternshipCard';
import CardSkeleton from '../components/skeletons/CardSkeleton'; // Import CardSkeleton

const BrowseInternships = () => {
  const { internships, getFilteredInternships, getRecommendedInternships, getSearchableTerms, isLoadingExternal } = useData();
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    paid: 'all',
    domain: 'all',
    location: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef(null);

  // If internships are still loading, domains might be undefined or empty.
  // Provide a fallback or handle the loading state gracefully.
  const domains = internships && internships.length > 0 ? [...new Set(internships.map(i => i.domain))] : [];
  const types = ['Remote', 'Onsite', 'Hybrid'];

  const allSearchableTerms = getSearchableTerms();

  useEffect(() => {
    if (filters.search) {
      const lowercasedSearch = filters.search.toLowerCase();
      const filtered = allSearchableTerms.filter(term => 
        term.toLowerCase().includes(lowercasedSearch)
      );
      setSuggestions(filtered.slice(0, 5)); // Limit to 5 suggestions
      setShowSuggestions(true);
    } else {
      setSuggestions([]); // Clear suggestions when search is empty
      setShowSuggestions(false);
    }
  }, [filters.search, allSearchableTerms]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (suggestion) => {
    setFilters({ ...filters, search: suggestion });
    setShowSuggestions(false);
  };

  const filteredInternships = getFilteredInternships(filters);
  const recommendedInternships = getRecommendedInternships();

  // Show skeletons if internships are loading (either local or external)
  // Or if internships are empty but external is still loading
  if ((!internships || internships.length === 0) && isLoadingExternal) {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Search and Filters Skeleton */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border h-48 animate-pulse"></div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
                </div>
            </div>
        </div>
    );
  }

  // If internships are loaded but still empty
  if (!internships || internships.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2 gradient-text">Find Your Next Opportunity</h1>
            <p className="text-gray-700 text-lg">Explore thousands of internships to launch your career.</p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border">
            {/* Search Bar */}
            <div className="relative mb-4" ref={searchContainerRef}>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, skill, company, or keyword (e.g. 'React', 'Python', 'Marketing')"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                onFocus={() => setShowSuggestions(true && filters.search)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                autoComplete="off"
              />
            </div>
            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-primary-600 font-semibold mb-4 hover:text-primary-800"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
            </button>
          </div>

          <div className="col-span-full text-center py-16 bg-white rounded-[16px] shadow-md">
              <h3 className="text-2xl font-semibold text-gray-700">No Internships Found</h3>
              <p className="text-gray-500 text-lg mt-2">Try adjusting your search or filters.</p>
              <button
                  onClick={() => setFilters({ search: '', type: 'all', paid: 'all', domain: 'all', location: '' })}
                  className="mt-6 px-5 py-2.5 gradient-bg text-white font-semibold rounded-[12px] hover:opacity-90 transition"
              >
                  Clear All Filters
              </button>
          </div>
        </div>
      </div>
    );
  }

  const hasActiveSearch = filters.search || filters.location || filters.type !== 'all' || filters.paid !== 'all' || filters.domain !== 'all';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 gradient-text">Find Your Next Opportunity</h1>
          <p className="text-gray-700 text-lg">Explore thousands of internships to launch your career.</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-[16px] shadow-md p-6 mb-8 border">
          {/* Search Bar */}
          <div className="relative mb-4" ref={searchContainerRef}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, skill, company, or keyword (e.g. 'React', 'Python', 'Marketing')"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              onFocus={() => setShowSuggestions(true && filters.search)}
              className="w-full pl-12 pr-4 py-3 rounded-[12px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-action-blue transition"
              autoComplete="off"
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-[12px] mt-1 shadow-lg max-h-60 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <li 
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-action-blue font-semibold mb-4 hover:text-deep-navy"
          >
            <Filter className="h-4 w-4" />
            {showFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
          </button>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-down">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Work Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="w-full px-3 py-2 rounded-[12px] border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-action-blue"
                >
                  <option value="all">All Types</option>
                  {types.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment</label>
                <select
                  value={filters.paid}
                  onChange={(e) => setFilters({ ...filters, paid: e.target.value })}
                  className="w-full px-3 py-2 rounded-[12px] border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-action-blue"
                >
                  <option value="all">All</option>
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Domain</label>
                <select
                  value={filters.domain}
                  onChange={(e) => setFilters({ ...filters, domain: e.target.value })}
                  className="w-full px-3 py-2 rounded-[12px] border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-action-blue"
                >
                  <option value="all">All Domains</option>
                  {domains.map(domain => (
                    <option key={domain} value={domain}>{domain}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  placeholder="e.g. 'Remote', 'New York'"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-[12px] border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-action-blue"
                />
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div>
            <p className="text-gray-600 mb-6 font-semibold">
                {filteredInternships.length > 0 && `${filteredInternships.length} ${filteredInternships.length === 1 ? 'internship' : 'internships'} found`}
            </p>
            {filteredInternships.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredInternships.map(internship => (
                        <InternshipCard key={internship.id} internship={internship} />
                    ))}
                </div>
            ) : hasActiveSearch ? (
              <div className="col-span-full text-center py-16 bg-white rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-gray-700">No internships match your current criteria.</h3>
                <p className="text-gray-500 text-lg mt-2">Try adjusting your search or filters. Here are some popular options:</p>
                {recommendedInternships.length > 0 && (
                  <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recommendedInternships.map(internship => (
                      <InternshipCard key={internship.id} internship={internship} />
                    ))}
                  </div>
                )}
                {domains.length > 0 && (
                  <>
                    <p className="text-gray-500 text-lg mt-8">Or explore by popular categories:</p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3">
                      {domains.slice(0, 5).map(domain => ( // Show top 5 domains
                        <button
                          key={domain}
                          onClick={() => setFilters({ ...filters, domain: domain })}
                          className="px-4 py-2 bg-slate-grey/10 text-deep-navy rounded-full text-sm font-medium hover:bg-slate-grey/20 hover:text-action-blue transition"
                        >
                          {domain}
                        </button>
                      ))}
                    </div>
                  </>
                )}
                <button
                  onClick={() => setFilters({ search: '', type: 'all', paid: 'all', domain: 'all', location: '' })}
                  className="mt-8 px-5 py-2.5 gradient-bg text-white font-semibold rounded-[12px] hover:opacity-90 transition"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
                <div className="col-span-full text-center py-16 bg-white rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold text-gray-700">No Internships Available Yet.</h3>
                    <p className="text-gray-500 text-lg mt-2">Check back later or explore some popular categories.</p>
                    {domains.length > 0 && (
                      <div className="mt-4 flex flex-wrap justify-center gap-3">
                        {domains.slice(0, 5).map(domain => ( // Show top 5 domains
                          <button
                            key={domain}
                            onClick={() => setFilters({ ...filters, domain: domain })}
                            className="px-4 py-2 bg-slate-grey/10 text-deep-navy rounded-full text-sm font-medium hover:bg-slate-grey/20 hover:text-action-blue transition"
                          >
                            {domain}
                          </button>
                        ))}
                      </div>
                    )}
                    <button
                        onClick={() => setFilters({ search: '', type: 'all', paid: 'all', domain: 'all', location: '' })}
                        className="mt-6 px-5 py-2.5 gradient-bg text-white font-semibold rounded-[12px] hover:opacity-90 transition"
                    >
                        Clear All Filters
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default BrowseInternships;
