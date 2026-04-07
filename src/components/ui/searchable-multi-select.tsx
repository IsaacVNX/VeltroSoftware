'use client';
import * as React from 'react';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const INITIAL_VISIBLE_ITEMS = 20;

interface SearchableMultiSelectProps<T> {
  items: T[];
  onSelectItems: (items: string[]) => void;
  renderItem: (item: T) => React.ReactNode;
  filterFunction: (item: T, query: string) => boolean;
  placeholder?: string;
  disabled?: boolean;
  selectedItemIds: string[];
}

export function SearchableMultiSelect<T extends { id: string, nome?: string }>({
  items,
  onSelectItems,
  renderItem,
  filterFunction,
  placeholder = 'Selecione os itens...',
  disabled = false,
  selectedItemIds,
}: SearchableMultiSelectProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [visibleItemsCount, setVisibleItemsCount] = React.useState(INITIAL_VISIBLE_ITEMS);

  const filteredItems = React.useMemo(() => {
    if (!query) return items;
    return items.filter((item) => filterFunction(item, query));
  }, [items, query, filterFunction]);

  const itemsToShow = React.useMemo(() => {
    return filteredItems.slice(0, visibleItemsCount);
  }, [filteredItems, visibleItemsCount]);

  const toggleItem = (item: T) => {
    const isSelected = selectedItemIds.includes(item.id);
    if (isSelected) {
      onSelectItems(selectedItemIds.filter(id => id !== item.id));
    } else {
      onSelectItems([...selectedItemIds, item.id]);
    }
  };

  const removeAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectItems([]);
  };

  React.useEffect(() => {
    if (!open) {
      setQuery('');
      setVisibleItemsCount(INITIAL_VISIBLE_ITEMS);
    }
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between text-primary-foreground bg-transparent border-primary-foreground/50 hover:bg-primary-foreground/10 hover:text-primary-foreground h-auto min-h-10 py-2 px-3 focus:ring-0 focus:ring-offset-0"
          disabled={disabled}
        >
          <div className="flex flex-wrap gap-1 item-center flex-1 pr-2 max-w-full overflow-hidden">
             {selectedItemIds.length > 0 ? (
               <span className="truncate">{selectedItemIds.length} selecionado(s)</span>
             ) : (
               <span className="text-primary-foreground/70 font-normal truncate">{placeholder}</span>
             )}
          </div>
          <div className="flex items-center gap-1">
             {selectedItemIds.length > 0 && (
                <div onClick={removeAll} className="cursor-pointer hover:bg-black/10 rounded-full p-0.5">
                   <X className="h-4 w-4 shrink-0 opacity-80" />
                </div>
             )}
            <ChevronsUpDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command filter={() => 1}>
          <CommandInput 
            placeholder="Pesquisar..." 
            value={query} 
            onValueChange={setQuery}
          />
          <CommandList>
            <CommandEmpty>Nenhum item encontrado.</CommandEmpty>
            <CommandGroup>
              {itemsToShow.map((item) => {
                const isSelected = selectedItemIds.includes(item.id);
                return (
                  <CommandItem
                    key={item.id}
                    value={item.id}
                    onSelect={() => toggleItem(item)}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        isSelected ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {renderItem(item)}
                  </CommandItem>
                )
              })}
              {filteredItems.length > visibleItemsCount && (
                <CommandItem
                  onSelect={() => {
                    setVisibleItemsCount(prev => prev + INITIAL_VISIBLE_ITEMS);
                  }}
                  className="justify-center text-center text-sm text-muted-foreground cursor-pointer"
                >
                  Exibir mais {Math.min(INITIAL_VISIBLE_ITEMS, filteredItems.length - visibleItemsCount)}...
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
