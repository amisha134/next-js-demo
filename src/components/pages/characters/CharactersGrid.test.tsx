import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore, { MockStoreEnhanced } from 'redux-mock-store'
import CharactersGrid from './CharactersGrid'
import { fetchCharacters } from '@/redux/slices/characters'
import '@testing-library/jest-dom'

jest.mock('@/redux/slices/characters', () => ({
  fetchCharacters: jest.fn(),
  setCurrentPage: jest.fn(),
}))

const mockStore = configureStore([])

describe('CharactersGrid Component', () => {
  let store: MockStoreEnhanced<unknown>

  beforeEach(() => {
    store = mockStore({
      characters: {
        results: [
          {
            id: 1,
            title: 'Sample Product',
            availabilityStatus: 'In Stock',
            category: 'Skincare',
            discountPercentage: 15,
            brand: 'Beauty Brand',
            description: 'Sample product description',
            warrantyInformation: '1 Year',
            images: ['https://example.com/image.jpg'],
          },
        ],
        currentPage: 1,
        pages: 10,
      },
    })
    store.dispatch = jest.fn()
  })

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <CharactersGrid />
      </Provider>
    )
  }

  it('renders product information', () => {
    renderComponent()
    expect(screen.getByText('Sample Product')).toBeInTheDocument()
    expect(screen.getByText('In Stock')).toBeInTheDocument()
    expect(screen.getByText('Skincare')).toBeInTheDocument()
    expect(screen.getByText('15%')).toBeInTheDocument()
    expect(screen.getByText('Beauty Brand')).toBeInTheDocument()
    expect(screen.getByText('1 Year')).toBeInTheDocument()
  })

  it('dispatches fetchCharacters on mount', () => {
    renderComponent()
    expect(store.dispatch).toHaveBeenCalledWith(fetchCharacters())
  })

  it('renders table headers', () => {
    renderComponent()
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Category')).toBeInTheDocument()
    expect(screen.getByText('Discount')).toBeInTheDocument()
    expect(screen.getByText('Brand')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Warranty')).toBeInTheDocument()
  })
})
