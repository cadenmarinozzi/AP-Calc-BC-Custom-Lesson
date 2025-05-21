export default `
    varying vec2 vUv;
    uniform sampler2D uSpaceTexture;
    uniform vec2 uResolution;
    uniform vec2 uCameraRotation;
    uniform bool uShowAccretionDisk;
    uniform float uAccretionRadius;
    uniform bool uUseRelativity;

    #define MAX_ITERATIONS 200
    #define STEP_SIZE 0.1
    #define PI 3.1415926535897932384626433832795
    #define TAU 6.283185307179586476925286766559

    vec3 rotate(vec3 v, vec3 angle) {
        float x = v.x;
        float y = v.y;
        float z = v.z;

        float cx = cos(angle.x);
        float cy = cos(angle.y);
        float cz = cos(angle.z);

        float sx = sin(angle.x);
        float sy = sin(angle.y);
        float sz = sin(angle.z);

        float nx = cy * (sz * y + cz * x) - sy * z;
        float ny = sx * (cy * z + sy * (sz * y + cz * x)) + cx * (cz * y - sz * x);
        float nz = cx * (cy * z + sy * (sz * y + cz * x)) - sx * (cz * y - sz * x);

        return vec3(nx, ny, nz);
    }

    vec4 raytrace(vec3 rayDir, vec3 rayPos) {
        vec4 color = vec4(0, 0, 0, 0);
        float h2 = pow(length(cross(rayPos, rayDir)), 2.0);
        bool hit = false;

        for (int i = 0; i < MAX_ITERATIONS; i++) {
            float dist = length(rayPos - vec3(0, 0, 0));

            if (dist < 1.0) {
                hit = true;
                break;
            }

            if (dist > 100.0) {
                break;
            }
                
            if (uUseRelativity == true) {
                rayDir += -1.5 * h2 * rayPos / pow(pow(dist, 2.0), 2.5) * STEP_SIZE;  
            }
            
            vec3  steppedRayPos = rayPos + rayDir * STEP_SIZE;

             if (dist > 2.0 && dist < uAccretionRadius && rayPos.y * steppedRayPos.y < pow(STEP_SIZE, 10.0) && uShowAccretionDisk == true) {
                float a = 4.0 / dist * 1.0;
                color += vec4(a, a, a, 0) * 100.0;
            }

            rayPos = steppedRayPos;

             color += vec4(0, 0, 0, 2);
        }       

        return hit == true ? color / float(MAX_ITERATIONS) : texture2D(uSpaceTexture, rayDir.xy) + ( color / float(MAX_ITERATIONS));
    }

  
  void main() {
    vec2 uv = (vUv - 0.5) * 2.0 * vec2(uResolution.x / uResolution.y, 1);
    
    vec3 rayDir = rotate(normalize(vec3(uv, 1)), vec3(uCameraRotation, 0));
    vec3 rayPos = rotate(vec3(0, 0, -10), vec3(uCameraRotation, 0));

    vec4 color = raytrace(rayDir, rayPos);
    gl_FragColor = color;
  }
`;
