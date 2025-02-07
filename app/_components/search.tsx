import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Search = () => {
    return ( 
        <div className="flex gap-1">
            <Input placeholder="Buscar Restaurantes" className="border-none"/>
            <Button size="icon">
                <SearchIcon size={18}/>
                 </Button>
        </div>
     );
}
 
export default Search;