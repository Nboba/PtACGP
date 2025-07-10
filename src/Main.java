public class Main {
    public static void main(String[] args){
        Cola cola = new Cola();
        int[] entrada=new int[]{1,23,4,5};

        for(int n : entrada){
            cola.encolar(n);
        }
        System.out.println(cola.minimo().get());
        System.out.println(cola.desEncolar());
        System.out.println(cola.minimo().get());
    }
}


