package com.Ecom.demoEcommerceWeb.Utils;

// Importing necessary dependencies
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

/**
 * Utility class for extracting information from a JWT token.
 */
public class ExtractJWT {

    /**
     * Extracts the payload of a JWT token and returns the value of a specified key.
     *
     * @param token The JWT token.
     * @param extraction The key to extract from the payload.
     * @return The value of the specified key in the payload, or null if the key is not found.
     */
    public static String payloadJWTExtraction(String token, String extraction) {
        // Remove the "Bearer " prefix from the token
        token = token.replace("Bearer ", "");
        // Split the token into chunks
        String[] chunks = token.split("\\.");
        // Create a Base64 decoder
        Base64.Decoder decoder = Base64.getUrlDecoder();
        // Decode the second chunk (payload)
        String payload = new String(decoder.decode(chunks[1]));
        // Split the payload into entries
        String[] entries = payload.split(",");
        // Create a map to store the key-value pairs
        Map<String, String> map = new HashMap<>();
        // Iterate over the entries
        for (String entry : entries) {
            // Split the entry into key-value
            String[] keyValue = entry.split(":");
            // Check if the key matches the specified extraction key
            if (keyValue[0].equals(extraction)) {
                // Remove any trailing curly braces
                int remove = 1;
                if (keyValue[1].endsWith("}")) {
                    remove = 2;
                }
                // Extract the value by removing the first and last characters and removing any leading or trailing quotes
                keyValue[1] = keyValue[1].substring(0, keyValue[1].length() - remove);
                keyValue[1] = keyValue[1].substring(1, keyValue[1].length() - 1);
                // Add the key-value pair to the map
                map.put(keyValue[0], keyValue[1]);
            }
        }
        // Check if the map contains the specified extraction key
        if (map.containsKey(extraction)) {
            // Return the value of the specified key
            return map.get(extraction);
        }
        // Return null if the key is not found
        return null;
    }
}