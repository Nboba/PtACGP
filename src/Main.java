import java.util.*;

public class Main {
    public static void main(String[] args){
        int[] entrada = new int[]{4, 2, 7, 2, 4, 9, 1};
        int[] salida = ordenaryLimpiarRepetidos(entrada);
        for(int n : salida){
            System.out.print(n+" ");
        }
    }
    // Funcion que recibe los valores de entrada desordenados y con valores repetidos
    // Devuelve un array de enteros con los valores unicos y ordenados.
    public static int[] ordenaryLimpiarRepetidos(int[] entrada){
        int[] numeroUnicos= obtenerUnicos(entrada);
        int nUnicos = numeroUnicos.length;
        for(int i =0 ; i < nUnicos; i++ ){
            for(int j =0; j< nUnicos -1 ; j++){
                if (numeroUnicos[j] > numeroUnicos[j +1]) {
                    int auxNumero = numeroUnicos[j];
                    numeroUnicos[j] = numeroUnicos[j +1];
                    numeroUnicos[j +1] = auxNumero;                }
            }
        }
        return numeroUnicos;
    }
    // Funcion que recibe los valores de entrada desordenados y con valores repetidos
    // Devuelve un array de enteros con los valores sin repetir.
    public static int[] obtenerUnicos(int[] entrada){
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
        return numeros;
    }
}


//Problema:
//Escribe una función que reciba una lista de números enteros y devuelva una nueva lista con los números ordenados, eliminando los duplicados.
//
//        Ejemplo:
//entrada = [4, 2, 7, 2, 4, 9, 1]
//salida = [1, 2, 4, 7, 9]
