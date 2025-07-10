import java.util.Arrays;
import java.util.Optional;

public class Cola {
    private int[] values = new int[0];
    public Cola(){}
    public Cola(int... value){
        for(int n : value){
            encolar(n);
        }
    }

    // Push, funcionar para agregar valores a la cola
    public void encolar(int value){
        int[] auxValues;
        auxValues = Arrays.copyOf(values,values.length + 1 );
        auxValues[values.length] = value;
        values = auxValues;
    }
    //Pop, funcion para obtener y remover el primer elemento de la cola
    public int desEncolar(){
        int[] auxValues = Arrays.copyOfRange(values,1,values.length);
        int salida = values[0];
        values = auxValues;
        return salida;
    }
   // Retorna un tipo Opcional con el valor mas pequeño guardado en la cola o uno vacio.
    public Optional<Integer> minimo(){
        if(values.length == 0) return Optional.empty();
        int minimoSalida = values[0];
        for(int n : values){
            if(minimoSalida > n) minimoSalida = n;
        }
        return Optional.of(minimoSalida);
    }

}
