import {
  ExternalLinkIcon,
  Loader2Icon,
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from 'lucide-react'
import { useState } from 'react'
import { NumericFormat } from 'react-number-format'
import { toast } from 'sonner'

import { useEditTransactionForm } from '@/forms/hooks/transactions'

import { Button } from './ui/button'
import { DatePicker } from './ui/date-picker'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

const EditTransactionButton = ({ transaction }) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false)
  const { form, onSubmit } = useEditTransactionForm({
    transaction,
    onSuccess: () => {
      setSheetIsOpen(false)
      toast.success('Transação editada com sucesso!')
    },
    onError: () => {
      toast.error('Ocorreu um erro ao editar a transação!')
    },
  })
  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <ExternalLinkIcon className="text-muted-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[500px]">
        <SheetTitle>Editar tranasção</SheetTitle>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            {/* NOME DA TRANSAÇÃO */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Digite o nome da transação"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* VALOR DA TRANSAÇÃO */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor </FormLabel>
                  <FormControl>
                    <NumericFormat
                      placeholder="Digite o valor da transação"
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="R$ "
                      allowNegative={false}
                      customInput={Input}
                      onValueChange={(values) =>
                        field.onChange(values.floatValue)
                      }
                      {...field}
                      onChange={() => {}}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* DATA DA OPERAÇÃO */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data </FormLabel>
                  <FormControl>
                    <DatePicker
                      {...field}
                      placeholder="Selecione a data da transação"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* TIPO DA OPERAÇÃO */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <div className="grid grid-cols-3 gap-4">
                    {/* EARNING - GANHOS */}
                    <Button
                      type="button"
                      variant={
                        field.value === 'EARNING' ? 'secondary' : 'outline'
                      }
                      onClick={() => field.onChange('EARNING')}
                    >
                      <TrendingUpIcon className="text-primary-green" />
                      Ganho
                    </Button>
                    {/* EXPENSES - GASTOS */}
                    <Button
                      type="button"
                      variant={
                        field.value === 'EXPENSE' ? 'secondary' : 'outline'
                      }
                      onClick={() => field.onChange('EXPENSE')}
                    >
                      <TrendingDownIcon className="text-primary-red" />
                      Gasto
                    </Button>
                    {/* INVESTMENT - Investimentos */}
                    <Button
                      type="button"
                      variant={
                        field.value === 'INVESTMENT' ? 'secondary' : 'outline'
                      }
                      onClick={() => field.onChange('INVESTMENT')}
                    >
                      <PiggyBankIcon className="text-primary-blue" />
                      Investimento
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter className="sm:space-x-4">
              <SheetClose asChild>
                <Button type="reset" variant="secondary" className="w-full">
                  Cancelar
                </Button>
              </SheetClose>
              <Button
                type="submit"
                className="w-full"
                disabled={
                  form.formState.isSubmitting && (
                    <Loader2Icon className="animate-spin" />
                  )
                }
              >
                Salvar
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}

export default EditTransactionButton
