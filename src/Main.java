public class Main {
    public static void main(String[] args){
        int[] entrada=new int[]{1,23,4,5};
        Cola cola = new Cola(entrada);
        cola.encolar(3);
        System.out.println("Valor minimo: "+cola.minimo().get());
        System.out.println("Primer valor: "+cola.desEncolar());
        System.out.println("Valor minimo: "+cola.minimo().get());
    }
}


