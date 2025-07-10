import java.util.*;

public class Main {
    public static void main(String[] args){
        int[] entrada = new int[]{4, 2, 7, 2, 4, 9, 1};
        int[] salida = ordenaryLimpiarRepetidos(entrada);
        for(int n : salida){
            System.out.print(n+" ");
        }
    }

    public static int[] ordenaryLimpiarRepetidos(int[] entrada){
        Set<Integer> numerosUnicos = new HashSet<>();
        for(int n: entrada){
            numerosUnicos.add(n);
        }
        int nUnicos = numerosUnicos.toArray().length;
        int[] numeros = new int[nUnicos];
        int z =0;
        for(Integer n: numerosUnicos.toArray(new Integer[nUnicos])){
            numeros[z++] = n;
        }
        for(int i =0 ; i < nUnicos; i++ ){
            for(int j =0; j< nUnicos -1 ; j++){
                if (numeros[j] > numeros[j +1]) {
                    int auxNumero = numeros[j];
                    numeros[j] = numeros[j +1];
                    numeros[j +1] = auxNumero;                }
            }
        }
        return numeros;
    }
}


//Problema:
//Escribe una función que reciba una lista de números enteros y devuelva una nueva lista con los números ordenados, eliminando los duplicados.
//
//        Ejemplo:
//entrada = [4, 2, 7, 2, 4, 9, 1]
//salida = [1, 2, 4, 7, 9]
