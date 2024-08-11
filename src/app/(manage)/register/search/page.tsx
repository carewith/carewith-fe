"use client";
import { useRouter } from "next/navigation";
import { useSearchStore } from "@/store/drugStore";
import SearchBar from "@/components/registpage/search/SearchBar";
import { Container } from "@/components/registpage/add/RegisterAddPage.styles";

const SearchPage = () => {
  const router = useRouter();
  const { setKeyword, keyword } = useSearchStore();

  const handleSearch = (selectedKeyword: string) => {
    setKeyword(selectedKeyword);
    router.push("/register/add");
  };

  return (
    <Container>
      <SearchBar initialValue={keyword} onSearch={handleSearch} />
    </Container>
  );
};

export default SearchPage;
