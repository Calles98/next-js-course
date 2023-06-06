import { NewsArticle } from "@/models/NewsArticles";
import { FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";

const SearchNewsPage = () => {

    const [searchResults, setSearchResults] = useState<NewsArticle[] | null>(null); 
    const [searchResultsLoading, setSearchResultsLoading] = useState(false); 
    const [searchResultsLoadingIsError, setSearchResultsLoadingIsError] = useState(false); 

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault(); 
        const formData = new FormData(e.target as HTMLFormElement); 
        const searchQuery = formData.get("searchQuery")?.toString().trim(); 

        if (searchQuery) {
            try {
                setSearchResults(null);
                setSearchResultsLoadingIsError(false);
                setSearchResultsLoading(true);
                const response = await fetch("/api/search-news?q=" + searchQuery);
                const articles: NewsArticle[] = await response.json();
                setSearchResults(articles);
            } catch (error) {
                console.error(error);
                setSearchResultsLoadingIsError(true);
            } finally {
                setSearchResultsLoading(false);
            }
        }
    }

    return ( 
        <main>
            <h1>Search News</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="search-input">
                    <Form.Label>Search</Form.Label>
                    <Form.Control name="searchQuery" placeholder="E.g. politics, sports, ..."  />
                </Form.Group>
                <Button type="submit" className="mb-3" disabled={searchResultsLoading}>Search</Button>
            </Form>
        </main>
     );
}
 
export default SearchNewsPage;