import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import CharactersGrid from "./CharactersGrid";
import { fetchCharacters } from "@/redux/slices/characters";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";

// Define types for the mock store state
interface MockProduct {
  id: number;
  title: string;
  availabilityStatus: string;
  category: string;
  discountPercentage: number;
  brand: string;
  description: string;
  warrantyInformation: string;
  images: string[];
}

interface MockState {
  characters: {
    results: MockProduct[];
    currentPage: number;
  };
}

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock the fetchCharacters action
jest.mock("@/redux/slices/characters", () => ({
  fetchCharacters: jest.fn(),
}));

const mockStore = configureStore<MockState>([]);
const mockPush = jest.fn();

describe("CharactersGrid Component", () => {
  let store: MockStoreEnhanced<MockState>;

  beforeEach(() => {
    // Mock router
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
    }));

    // Initialize mock store with test data
    store = mockStore({
      characters: {
        results: [
          {
            id: 1,
            title: "Test Product",
            availabilityStatus: "In Stock",
            category: "Beauty",
            discountPercentage: 20,
            brand: "Test Brand",
            description: "Test Description",
            warrantyInformation: "2 Years",
            images: ["test-image.jpg"],
          },
        ],
        currentPage: 1,
      },
    });
    store.dispatch = jest.fn();
  });

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <CharactersGrid />
      </Provider>
    );
  };

  it("should render all table headers correctly", () => {
    renderComponent();
    expect(screen.getByText("Image")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Discount")).toBeInTheDocument();
    expect(screen.getByText("Brand")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Warranty")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("should render product data correctly", () => {
    renderComponent();
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("In Stock")).toBeInTheDocument();
    expect(screen.getByText("Beauty")).toBeInTheDocument();
    expect(screen.getByText("20%")).toBeInTheDocument();
    expect(screen.getByText("Test Brand")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("2 Years")).toBeInTheDocument();
  });

  it("should dispatch fetchCharacters on mount", () => {
    renderComponent();
    expect(store.dispatch).toHaveBeenCalledWith(fetchCharacters());
  });

  it("should navigate to product detail page when View button is clicked", () => {
    renderComponent();
    const viewButton = screen.getByText("View");
    fireEvent.click(viewButton);
    expect(mockPush).toHaveBeenCalledWith("/product-detail/1");
  });
});
