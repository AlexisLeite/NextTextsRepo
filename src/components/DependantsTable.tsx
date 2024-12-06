import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { Dependant } from "@/types";

interface DependantsTableProps {
  dependants: Dependant[];
  onAddDependant: () => void;
  onRemoveDependant: (index: number) => void;
  onUpdateDependant: (
    index: number,
    field: keyof Dependant,
    value: string,
  ) => void;
}

export function DependantsTable({
  dependants,
  onAddDependant,
  onRemoveDependant,
  onUpdateDependant,
}: DependantsTableProps) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Dependency Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dependants.map((dependant, index) => (
            <TableRow key={index}>
              <TableCell>
                <Input
                  value={dependant.name}
                  onChange={(e) =>
                    onUpdateDependant(index, "name", e.target.value)
                  }
                  placeholder="Name"
                />
              </TableCell>
              <TableCell>
                <Input
                  value={dependant.lastName}
                  onChange={(e) =>
                    onUpdateDependant(index, "lastName", e.target.value)
                  }
                  placeholder="Last Name"
                />
              </TableCell>
              <TableCell>
                <Input
                  value={dependant.role}
                  onChange={(e) =>
                    onUpdateDependant(index, "role", e.target.value)
                  }
                  placeholder="Dependency Role"
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => onRemoveDependant(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={onAddDependant} className="mt-4">
        Add Dependant
      </Button>
    </div>
  );
}
